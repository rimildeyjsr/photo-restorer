"use client";
import { useState, useCallback, useEffect } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { ImagePreview } from "@/components/ImagePreview";
import { PromptInput } from "@/components/PromptInput";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import type { ImageFile } from "@/types/image";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<ImageFile | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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
        </>
      ) : (
        <ImageUploader onFileUpload={handleFileUpload} onError={handleError} />
      )}

      {error && <ErrorDisplay error={error} />}
    </div>
  );
}
