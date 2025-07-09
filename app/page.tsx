"use client";
import { useState, useCallback, useEffect, MouseEvent } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { ImagePreview } from "@/components/ImagePreview";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { Authentication } from "@/components/Authentication";
import { PurchaseCreditsModal } from "@/components/PurchaseCreditsModal";
import { Button } from "@/catalyst-ui-kit/button";
import { SparklesIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/hooks/useAuth";
import { usePaddle } from "@/hooks/usePaddle";
import type { ImageFile } from "@/types/image";
import { PackageType } from "@/lib/constants/packages";
import { Prediction } from "replicate";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/api";

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

  const response = await fetch(`${API_BASE_URL}/api/credits`, {
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

  const {
    openCheckout,
    loading: paddleLoading,
    error: paddleError,
    isReady: paddleReady,
  } = usePaddle(user, userData);

  const [uploadedImage, setUploadedImage] = useState<ImageFile | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] =
    useState<boolean>(false);

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

  const handlePurchase = async (packageName: PackageType) => {
    try {
      setIsProcessingPayment(true);
      setShowPurchaseModal(false);
      await openCheckout(packageName);

      setTimeout(async () => {
        try {
          await refreshUserData();
        } catch (e) {
          console.log("❌ Failed to refresh:", e);
        }
        setIsProcessingPayment(false);
      }, 90000);
    } catch (err) {
      console.error("❌ Purchase failed:", err);
      setError("Failed to open checkout. Please try again.");
      setIsProcessingPayment(false);
    }
  };

  const handleRestore = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!uploadedImage?.file || isSubmitting || !user || !userData) return;

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

      const response = await fetch(`${API_BASE_URL}/api/predictions`, {
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

      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await sleep(1000);

        const statusResponse = await fetch(
          `${API_BASE_URL}/api/predictions/${prediction.id}`,
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

      if (prediction.status === "succeeded") {
        try {
          await deductCredit(user, 1);
          setPrediction(prediction);
          await refreshUserData();
        } catch (deductionError) {
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

  useEffect(() => {
    if (paddleError) {
      setError(paddleError);
    }
  }, [paddleError]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e6f40]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Photo Restorer
              </h1>
            </div>

            {/* Right side - Credits & User */}
            <div className="flex items-center gap-4">
              {userData && (
                <div className="flex items-center gap-3">
                  <div className="bg-[#2e6f40]/10 px-3 py-1.5 rounded-lg border border-[#2e6f40]/20">
                    <span className="text-sm font-medium text-[#2e6f40] dark:text-[#4ade80]">
                      {credits} credits
                      {isProcessingPayment && (
                        <span className="ml-2 text-orange-600">
                          (Processing...)
                        </span>
                      )}
                    </span>
                  </div>
                  <Button
                    outline
                    onClick={() => setShowPurchaseModal(true)}
                    disabled={
                      !paddleReady || paddleLoading || isProcessingPayment
                    }
                    className="text-sm hidden sm:flex"
                  >
                    <CreditCardIcon className="h-4 w-4" />
                    Buy Credits
                  </Button>
                </div>
              )}
              <Authentication />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {!user ? (
          <div className="max-w-md mx-auto text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Sign in to start processing images
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                You need to be authenticated to use the image restoration
                features.
              </p>
            </div>
          </div>
        ) : userData ? (
          <div className="space-y-6">
            {/* Status Banners */}
            {isNewUser && (
              <div className="bg-[#2e6f40]/10 border border-[#2e6f40]/20 rounded-lg p-4">
                <h3 className="text-[#2e6f40] font-medium dark:text-[#4ade80]">
                  Welcome to Photo Restorer!
                </h3>
                <p className="text-[#2e6f40]/80 text-sm mt-1 dark:text-[#4ade80]/80">
                  You currently have {credits} credits. Purchase credits to
                  start restoring your photos.
                </p>
              </div>
            )}

            {credits <= 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 dark:bg-amber-900/10 dark:border-amber-900/20">
                <h3 className="text-amber-800 font-medium dark:text-amber-400">
                  No Credits Remaining
                </h3>
                <p className="text-amber-700 text-sm mt-1 dark:text-amber-400/80">
                  You need credits to process images. Please purchase credits to
                  continue.
                </p>
                <Button
                  onClick={() => setShowPurchaseModal(true)}
                  disabled={
                    !paddleReady || paddleLoading || isProcessingPayment
                  }
                  className="mt-3"
                  color="amber"
                >
                  <CreditCardIcon className="h-4 w-4" />
                  Buy Credits Now
                </Button>
              </div>
            )}

            {/* Main Processing Area - Always Centered */}
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Upload/Preview Section - Only show if no results yet */}
              {!prediction?.output && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                    Upload Image
                  </h2>

                  {uploadedImage ? (
                    <div className="space-y-4">
                      <ImagePreview
                        image={uploadedImage}
                        onRemove={handleRemoveImage}
                      />

                      {/* Single Restore Button */}
                      <div className="flex justify-center">
                        <Button
                          onClick={handleRestore}
                          disabled={!canSubmit}
                          className="px-8"
                          color="emerald"
                        >
                          <SparklesIcon className="h-4 w-4" />
                          {isSubmitting ? "Processing..." : "Restore"}
                        </Button>
                      </div>

                      {credits <= 0 && (
                        <p className="text-center text-sm text-red-600 dark:text-red-400">
                          Purchase credits to process images
                        </p>
                      )}
                    </div>
                  ) : (
                    <ImageUploader
                      onFileUpload={handleFileUpload}
                      onError={handleError}
                      disabled={credits <= 0}
                    />
                  )}
                </div>
              )}

              {/* Results Section - Before/After Comparison */}
              {prediction && prediction.output && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Your restored image!
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        prediction.status === "succeeded"
                          ? "bg-[#2e6f40]/10 text-[#2e6f40] dark:bg-green-900/20 dark:text-green-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {prediction.status}
                    </span>
                  </div>

                  {/* Before/After Images */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Before Image */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                        Before
                      </h4>
                      <div className="rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700">
                        <Image
                          src={uploadedImage?.preview || ""}
                          alt="Original image"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          height={300}
                          width={300}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>

                    {/* After Image */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                        After
                      </h4>
                      <div className="rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700">
                        <Image
                          src={prediction.output}
                          alt="Restored image"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          height={300}
                          width={300}
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = prediction.output;
                        link.download = `restored-${uploadedImage?.file.name || "image"}`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="px-6"
                      color="emerald"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                      Download Image
                    </Button>

                    <Button
                      outline
                      onClick={() => {
                        setUploadedImage(null);
                        setPrediction(null);
                        setError(null);
                      }}
                      className="px-6"
                    >
                      <SparklesIcon className="h-4 w-4" />
                      Restore Another Image
                    </Button>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <ErrorDisplay error={error} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2e6f40] mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Setting up your account...
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Purchase Credits Modal */}
      <PurchaseCreditsModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onPurchase={handlePurchase}
        loading={paddleLoading}
      />
    </div>
  );
}
