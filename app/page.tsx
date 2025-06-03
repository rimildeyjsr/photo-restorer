"use client";
import { useState, useCallback, useEffect, MouseEvent } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { ImagePreview } from "@/components/ImagePreview";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { Button } from "@/catalyst-ui-kit/button";
import { SparklesIcon } from "@heroicons/react/24/outline";
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

export default function Home() {
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

    if (!uploadedImage?.file || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    setPrediction(null);

    try {
      const base64Image = await convertFileToBase64(uploadedImage.file);

      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input_image: base64Image,
        }),
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      let prediction = await response.json();
      setPrediction(prediction);

      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await sleep(1000);

        const statusResponse = await fetch(`/api/predictions/${prediction.id}`);

        if (!statusResponse.ok) {
          let errorMessage = `HTTP ${statusResponse.status}: ${statusResponse.statusText}`;
          try {
            const errorData = await statusResponse.json();
            errorMessage = errorData.detail || errorMessage;
          } catch {
            errorMessage = `Status check failed: ${statusResponse.status}`;
          }
          throw new Error(errorMessage);
        }

        prediction = await statusResponse.json();
        console.log("Prediction status:", prediction);
        setPrediction(prediction);
      }

      if (prediction.status === "failed") {
        throw new Error(prediction.error || "Prediction failed");
      }
    } catch (err) {
      console.error("Error in handleRestore:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = uploadedImage && !isSubmitting;

  useEffect(() => {
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage.preview);
      }
    };
  }, [uploadedImage]);

  return (
    <div className="m-28 space-y-6">
      {uploadedImage ? (
        <>
          <ImagePreview image={uploadedImage} onRemove={handleRemoveImage} />
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
        </>
      ) : (
        <ImageUploader onFileUpload={handleFileUpload} onError={handleError} />
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
          <p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
        </>
      )}
    </div>
  );
}
