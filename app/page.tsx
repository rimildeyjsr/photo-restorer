"use client";
import { useState, useCallback, useEffect } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { ImagePreview } from "@/components/ImagePreview";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { Button } from "@/catalyst-ui-kit/button";
import { SparklesIcon } from "@heroicons/react/24/outline";
import type { ImageFile } from "@/types/image";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<ImageFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileUpload = useCallback((imageFile: ImageFile) => {
    setUploadedImage(imageFile);
    setError(null);
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  const handleRemoveImage = useCallback(() => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage.preview);
      setUploadedImage(null);
      setError(null);
    }
  }, [uploadedImage]);

  const handleSubmit = useCallback(async () => {
    if (!uploadedImage || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      console.log("Submitting:", { image: uploadedImage });

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }, [uploadedImage, isSubmitting]);

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
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-48"
            >
              <SparklesIcon />
              {isSubmitting ? "Processing..." : "Recolour"}
            </Button>
            <Button
              outline
              onClick={handleSubmit}
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
    </div>
  );
}
