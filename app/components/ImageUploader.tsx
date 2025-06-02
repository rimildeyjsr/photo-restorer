import { useState, useRef, useCallback } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import type { ImageFile } from "@/types/image";

interface ImageUploaderProps {
  onFileUpload: (imageFile: ImageFile) => void;
  onError: (error: string) => void;
  maxSizeInMB?: number;
  acceptedFormats?: string[];
  className?: string;
}

const DEFAULT_ACCEPTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const DEFAULT_MAX_SIZE_MB = 20;

export function ImageUploader({
  onFileUpload,
  onError,
  maxSizeInMB = DEFAULT_MAX_SIZE_MB,
  acceptedFormats = DEFAULT_ACCEPTED_FORMATS,
  className = "",
}: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!acceptedFormats.includes(file.type)) {
        return `File type ${file.type} is not supported`;
      }

      if (file.size > maxSizeInMB * 1024 * 1024) {
        return `File size must be less than ${maxSizeInMB}MB`;
      }

      return null;
    },
    [acceptedFormats, maxSizeInMB],
  );

  const processFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        onError(`${file.name}: ${validationError}`);
        return;
      }

      const imageFile: ImageFile = {
        file,
        preview: URL.createObjectURL(file),
        id: `${file.name}-${Date.now()}-${Math.random()}`,
      };

      onFileUpload(imageFile);
    },
    [validateFile, onFileUpload, onError],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      processFile(files[0]);
      e.target.value = "";
    },
    [processFile],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    },
    [processFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`
          relative min-h-64 rounded-xl border-2 border-dashed p-12 text-center transition-all duration-200 ease-in-out cursor-pointer
          ${
            dragActive
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20 scale-[1.02]"
              : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(",")}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div
            className={`
            rounded-full p-6 transition-colors
            ${
              dragActive
                ? "bg-blue-100 dark:bg-blue-900/30"
                : "bg-zinc-100 dark:bg-zinc-800"
            }
          `}
          >
            <PhotoIcon
              className={`
              h-16 w-16 transition-colors
              ${
                dragActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-zinc-400 dark:text-zinc-500"
              }
            `}
            />
          </div>

          <div className="space-y-2">
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {dragActive
                ? "Drop your image here"
                : "Drop image here or click to upload"}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Support for PNG, JPG, GIF, WebP up to {maxSizeInMB}MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
