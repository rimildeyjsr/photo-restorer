"use client";
import { useState, useCallback, useEffect } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { ImagePreview } from "@/components/ImagePreview";
import { PromptInput } from "@/components/PromptInput";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { Button } from "@/catalyst-ui-kit/button";
import { SparklesIcon } from "@heroicons/react/24/outline";
import type { ImageFile } from "@/types/image";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<ImageFile | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileUpload = useCallback((imageFile: ImageFile) => {
    setUploadedImage(imageFile);
    setPrompt("");
    setError(null);
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  const handleRemoveImage = useCallback(() => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage.preview);
      setUploadedImage(null);
      setPrompt("");
      setError(null);
    }
  }, [uploadedImage]);

  const handlePromptChange = useCallback((newPrompt: string) => {
    setPrompt(newPrompt);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!uploadedImage || !prompt.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Add your submission logic here
      console.log("Submitting:", { image: uploadedImage, prompt });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }, [uploadedImage, prompt, isSubmitting]);

  const canSubmit = uploadedImage && prompt.trim() && !isSubmitting;

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
          <PromptInput
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Enter Prompt ..."
          />
          <div className="flex justify-center">
            <Button
              color="emerald"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-64"
            >
              <SparklesIcon />
              {isSubmitting ? "Processing..." : "Edit"}
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
