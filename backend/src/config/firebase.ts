import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let adminAuth: any = null;

export function initializeFirebaseAdmin() {
  if (getApps().length === 0) {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (serviceAccount) {
      try {
        const parsedServiceAccount = JSON.parse(serviceAccount);
        initializeApp({
          credential: cert(parsedServiceAccount),
        });
        console.log("✅ Firebase Admin initialized with service account");
      } catch (error) {
        console.error("❌ Failed to parse Firebase service account:", error);
        throw new Error("Invalid Firebase service account key");
      }
    } else {
      console.log(
        "⚠️ Firebase service account not provided, using default initialization",
      );
      initializeApp();
    }
  }

  // Initialize adminAuth after app is initialized
  adminAuth = getAuth();
}

export const getAdminAuth = () => {
  if (!adminAuth) {
    throw new Error(
      "Firebase Admin not initialized. Call initializeFirebaseAdmin() first.",
    );
  }
  return adminAuth;
};
