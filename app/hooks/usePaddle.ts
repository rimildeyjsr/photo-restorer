import { useState, useEffect } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { PACKAGES } from "@/api/constants/package";
import { PackageType } from "@/api/types/types";

export function usePaddle() {
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

    setLoading(true);
    setError(null);

    try {
      const packageInfo = PACKAGES[packageName];

      console.log("Opening checkout for:", packageName);
      console.log("Package info:", packageInfo);
      console.log("Product ID:", packageInfo.paddleProductId);

      await paddle.Checkout.open({
        items: [
          {
            priceId: packageInfo.paddleProductId,
            quantity: 1,
          },
        ],
        customData: {
          packageName,
          credits: packageInfo.credits.toString(),
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
