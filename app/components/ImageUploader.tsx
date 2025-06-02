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
  const [images, setImages] = useState<ImageFile[]>([]);
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

  const processFiles = useCallback(
    (fileList: FileList) => {
      const newFiles: ImageFile[] = [];
      const errors: string[] = [];

      Array.from(fileList).forEach((file) => {
        const validationError = validateFile(file);
        if (validationError) {
          errors.push(`${file.name}: ${validationError}`);
          return;
        }

        if (images.length + newFiles.length >= maxFiles) {
          errors.push(`Maximum ${maxFiles} files allowed`);
          return;
        }

        const imageFile: ImageFile = {
          file,
          preview: URL.createObjectURL(file),
          id: `${file.name}-${Date.now()}-${Math.random()}`,
        };

        newFiles.push(imageFile);
      });

      if (errors.length > 0) {
        setError(errors.join(", "));
        return;
      }

      setError(null);
      const updatedImages = [...images, ...newFiles];
      setImages(updatedImages);
      onFilesChange?.(updatedImages.map((img) => img.file));
    },
    [images, maxFiles, validateFile, onFilesChange],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      processFiles(files);
      e.target.value = "";
    },
    [processFiles],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);

      const files = e.dataTransfer.files;
      if (files) {
        processFiles(files);
      }
    },
    [processFiles],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const removeImage = useCallback(
    (id: string) => {
      setImages((prev) => {
        const imageToRemove = prev.find((img) => img.id === id);
        if (imageToRemove) {
          URL.revokeObjectURL(imageToRemove.preview);
        }

        const updatedImages = prev.filter((img) => img.id !== id);
        onFilesChange?.(updatedImages.map((img) => img.file));
        return updatedImages;
      });
      setError(null);
    },
    [onFilesChange],
  );

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`
          relative min-h-64 rounded-xl border-2 border-dashed p-12 text-center transition-all duration-200 ease-in-out
          ${
            dragActive
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20 scale-[1.02]"
              : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600"
          }
          ${
            images.length >= maxFiles
              ? "opacity-50 pointer-events-none"
              : "cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
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
          multiple
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
                ? "Drop your images here"
                : "Drop images here or click to upload"}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Support for PNG, JPG, GIF, WebP up to {maxSizeInMB}MB each
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Maximum {maxFiles} file
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 p-4">
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
      )}

      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Uploaded Images ({images.length})
            </h3>
            {images.length < maxFiles && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {maxFiles - images.length} more allowed
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-700">
                  <img
                    src={image.preview}
                    alt={image.file.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                <Button
                  plain
                  onClick={() => removeImage(image.id)}
                  className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 hover:scale-110 !border-0 shadow-lg"
                >
                  <XMarkIcon className="h-4 w-4" data-slot="icon" />
                </Button>

                <div className="mt-2 space-y-1">
                  <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {image.file.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {(image.file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
