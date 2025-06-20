"use client";
import { useState, useCallback, useEffect, MouseEvent } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { ImagePreview } from "@/components/ImagePreview";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { Authentication } from "@/components/Authentication";
import { Button } from "@/catalyst-ui-kit/button";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/hooks/useAuth";
import type { ImageFile } from "@/types/image";
import { Prediction } from "replicate";
import Image from "next/image";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = (error) => reject(error);
  });
};

const deductCredit = async (user: any, amount: number = 1) => {
  const idToken = await user.getIdToken();

  const response = await fetch("/api/credits", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      firebaseUid: user.uid,
      amount: amount,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to deduct credits");
  }

  return await response.json();
};

export default function Home() {
  const {
    user,
    userData,
    credits,
    loading: authLoading,
    isNewUser,
    refreshUserData,
  } = useAuth();

  const [uploadedImage, setUploadedImage] = useState<ImageFile | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileUpload = useCallback((imageFile: ImageFile) => {
    setUploadedImage(imageFile);
    setError(null);
    setPrediction(null);
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  const handleRemoveImage = useCallback(() => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage.preview);
      setUploadedImage(null);
      setError(null);
      setPrediction(null);
    }
  }, [uploadedImage]);

  const handleRestore = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!uploadedImage?.file || isSubmitting || !user || !userData) return;

    // Check if user has credits
    if (credits <= 0) {
      setError(
        "You don't have enough credits to process this image. Please purchase more credits.",
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setPrediction(null);

    try {
      const base64Image = await convertFileToBase64(uploadedImage.file);
      const idToken = await user.getIdToken();

      // Start the prediction (no credit deduction yet)
      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          input_image: base64Image,
        }),
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      let prediction = await response.json();

      // Poll for completion
      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await sleep(1000);

        const statusResponse = await fetch(
          `/api/predictions/${prediction.id}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );

        if (!statusResponse.ok) {
          let errorMessage = `HTTP ${statusResponse.status}: ${statusResponse.statusText}`;
          try {
            const errorData = await statusResponse.json();
            errorMessage = errorData.error || errorMessage;
          } catch {
            errorMessage = `Status check failed: ${statusResponse.status}`;
          }
          throw new Error(errorMessage);
        }

        prediction = await statusResponse.json();
      }

      if (prediction.status === "failed") {
        throw new Error(prediction.error || "Prediction failed");
      }

      // 🎯 NEW: Deduct credit BEFORE showing the result
      if (prediction.status === "succeeded") {
        try {
          await deductCredit(user, 1);

          // Credit deduction successful - now show the result
          setPrediction(prediction);

          // Update credits display
          await refreshUserData();
        } catch (deductionError) {
          // Credit deduction failed - don't show the result
          setError(
            deductionError instanceof Error
              ? `Payment processing failed: ${deductionError.message}`
              : "Payment processing failed. Please try again.",
          );
          return;
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit =
    uploadedImage && !isSubmitting && user && userData && credits > 0;

  useEffect(() => {
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage.preview);
      }
    };
  }, [uploadedImage]);

  if (authLoading) {
    return (
      <div className="m-28 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="m-28 space-y-6">
      <div className="flex justify-between items-center mb-6">
        {/* Credits Display */}
        {userData && (
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium text-blue-900">
              Credits: {credits}
            </span>
          </div>
        )}
        <Authentication />
      </div>

      {!user ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">
            Sign in to start processing images
          </h2>
          <p className="text-gray-600 mb-8">
            You need to be authenticated to use the image restoration features.
          </p>
        </div>
      ) : userData ? (
        <>
          {isNewUser && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="text-green-800 font-medium">
                Welcome to Photo Restorer!
              </h3>
              <p className="text-green-700 text-sm mt-1">
                You currently have {credits} credits. Purchase credits to start
                restoring your photos.
              </p>
            </div>
          )}

          {credits <= 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="text-yellow-800 font-medium">
                No Credits Remaining
              </h3>
              <p className="text-yellow-700 text-sm mt-1">
                You need credits to process images. Please purchase credits to
                continue.
              </p>
            </div>
          )}

          {uploadedImage ? (
            <>
              <ImagePreview
                image={uploadedImage}
                onRemove={handleRemoveImage}
              />
              <div className="flex justify-center gap-4">
                <Button
                  outline
                  onClick={() => {}}
                  disabled={!canSubmit}
                  className="w-48"
                >
                  <SparklesIcon />
                  {isSubmitting ? "Processing..." : "Recolour"}
                </Button>
                <Button
                  outline
                  onClick={handleRestore}
                  disabled={!canSubmit}
                  className="w-48"
                >
                  <SparklesIcon />
                  {isSubmitting ? "Processing..." : "Restore"}
                </Button>
              </div>
              {credits <= 0 && (
                <p className="text-center text-sm text-red-600 mt-2">
                  Purchase credits to process images
                </p>
              )}
            </>
          ) : (
            <ImageUploader
              onFileUpload={handleFileUpload}
              onError={handleError}
              disabled={credits <= 0}
            />
          )}

          {error && <ErrorDisplay error={error} />}

          {prediction && (
            <>
              {prediction.output && (
                <div className="image-wrapper mt-5">
                  <Image
                    src={prediction.output}
                    alt="output"
                    sizes="100vw"
                    height={410}
                    width={410}
                  />
                </div>
              )}
              <p className="py-3 text-sm opacity-50">
                status: {prediction.status}
              </p>
            </>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-gray-600 mt-2">Setting up your account...</p>
        </div>
      )}
    </div>
  );
}
