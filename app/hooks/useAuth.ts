import { useState, useEffect } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface DatabaseUser {
  id: string;
  firebaseUid: string;
  email: string;
  name: string | null;
  photoURL: string | null;
  credits: number;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  databaseUser: DatabaseUser | null;
  loading: boolean;
  error: string | null;
  isNewUser: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    databaseUser: null,
    loading: true,
    error: null,
    isNewUser: false,
  });

  const createOrUpdateUser = async (firebaseUser: User) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firebaseUid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to sync user with database");
      }

      const { user, isNewUser } = await response.json();

      setAuthState((prev) => ({
        ...prev,
        databaseUser: user,
        isNewUser,
      }));

      return { user, isNewUser };
    } catch (error) {
      console.error("Error syncing user with database:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Database sync failed";
      setAuthState((prev) => ({
        ...prev,
        error: errorMessage,
      }));
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          // User signed in - sync with database
          setAuthState((prev) => ({
            ...prev,
            user,
            loading: true,
            error: null,
          }));

          try {
            await createOrUpdateUser(user);
            setAuthState((prev) => ({ ...prev, loading: false }));
          } catch (error) {
            setAuthState((prev) => ({ ...prev, loading: false }));
          }
        } else {
          // User signed out - clear everything
          setAuthState({
            user: null,
            databaseUser: null,
            loading: false,
            error: null,
            isNewUser: false,
          });
        }
      },
      (error) => {
        setAuthState({
          user: null,
          databaseUser: null,
          loading: false,
          error: error.message,
          isNewUser: false,
        });
      },
    );

    return unsubscribe;
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Note: Database sync will happen automatically in onAuthStateChanged
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Authentication failed";
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Sign out failed";
      setAuthState((prev) => ({ ...prev, error: errorMessage }));
      throw error;
    }
  };

  const refreshUserData = async (): Promise<void> => {
    if (authState.user) {
      await createOrUpdateUser(authState.user);
    }
  };

  return {
    ...authState,
    signInWithGoogle,
    signOut,
    refreshUserData, // New method to manually refresh user data
    // Convenience properties
    userData: authState.databaseUser, // Easy access to database user
    credits: authState.databaseUser?.credits || 0, // Quick access to credits
  };
};
