import { useState, useEffect } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { PACKAGES, PackageType } from "@/lib/constants/packages";

interface UsePaddleProps {
  user?: any;
  userData?: any;
}

export function usePaddle(user?: any, userData?: any) {
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initPaddle = async () => {
      try {
        const paddleInstance = await initializePaddle({
          environment: "sandbox", // Change to "production" when going live
          token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
        });
        setPaddle(paddleInstance);
      } catch (err) {
        console.error("Failed to initialize Paddle:", err);
        setError("Failed to initialize payment system");
      }
    };

    initPaddle();
  }, []);

  const openCheckout = async (packageName: PackageType) => {
    if (!paddle) {
      setError("Payment system not initialized");
      return;
    }

    if (!user?.uid || !userData?.email) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const packageInfo = PACKAGES[packageName];

      console.log("Opening checkout for:", packageName);
      console.log("User:", user.uid, userData.email);

      await paddle.Checkout.open({
        items: [
          {
            priceId: packageInfo.paddleProductId,
            quantity: 1,
          },
        ],
        customData: {
          packageName: packageName,
          credits: packageInfo.credits.toString(),
          firebaseUid: user.uid, // ✅ Always has this
          userEmail: userData.email, // ✅ Always has this
          userName: userData.name || "Unknown",
        },
      });
    } catch (err) {
      console.error("Checkout failed:", err);
      setError("Failed to open checkout");
    } finally {
      setLoading(false);
    }
  };

  return {
    paddle,
    loading,
    error,
    openCheckout,
    isReady: !!paddle,
  };
}
