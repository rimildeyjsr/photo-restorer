import { useState, useRef, useCallback } from "react";
import { Button } from "@/catalyst-ui-kit/button";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

interface ImageUploaderProps {
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
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
  onFilesChange,
  maxFiles = 1,
  maxSizeInMB = DEFAULT_MAX_SIZE_MB,
  acceptedFormats = DEFAULT_ACCEPTED_FORMATS,
  className = "",
}: ImageUploaderProps) {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
        setError(`${file.name}: ${validationError}`);
        return;
      }

      setError(null);
      const imageFile: ImageFile = {
        file,
        preview: URL.createObjectURL(file),
        id: `${file.name}-${Date.now()}-${Math.random()}`,
      };

      setImage(imageFile);
      onFilesChange?.([file]);
    },
    [validateFile, onFilesChange],
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

  const removeImage = useCallback(() => {
    if (image) {
      URL.revokeObjectURL(image.preview);
      setImage(null);
      onFilesChange?.([]);
      setError(null);
    }
  }, [image, onFilesChange]);

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  if (image) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex justify-center">
          <div className="relative group">
            <Button
              plain
              onClick={removeImage}
              className="absolute top-5 right-2 rounded-full bg-white dark:bg-zinc-800 p-1.5 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-600 shadow-sm data-[hover]:!bg-white dark:data-[hover]:!bg-zinc-800"
            >
              <XMarkIcon className="h-4 w-4" data-slot="icon" />
            </Button>

            <div className="aspect-square w-64 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-700">
              <img
                src={image.preview}
                alt={image.file.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="flex justify-center">
            <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 max-w-md">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

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

      {error && (
        <div className="flex justify-center">
          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4 max-w-md">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
