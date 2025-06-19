import { useState, useRef, useCallback } from "react";
import { PhotoIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import type { ImageFile } from "@/types/image";

interface ImageUploaderProps {
  onFileUpload: (imageFile: ImageFile) => void;
  onError: (error: string) => void;
  maxSizeInMB?: number;
  acceptedFormats?: string[];
  className?: string;
  disabled?: boolean;
  disabledMessage?: string;
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
  disabled = false,
  disabledMessage = "Upload unavailable",
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
      if (disabled) return;

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
    [validateFile, onFileUpload, onError, disabled],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const files = e.target.files;
      if (!files || files.length === 0) return;

      processFile(files[0]);
      e.target.value = "";
    },
    [processFile, disabled],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    },
    [processFile, disabled],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setDragActive(true);
      }
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const openFileDialog = useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  }, [disabled]);

  const getDropzoneClasses = () => {
    const baseClasses =
      "relative min-h-64 rounded-xl border-2 border-dashed p-12 text-center transition-all duration-200 ease-in-out";

    if (disabled) {
      return `${baseClasses} border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50 cursor-not-allowed opacity-60`;
    }

    if (dragActive) {
      return `${baseClasses} border-blue-500 bg-blue-50 dark:bg-blue-950/20 scale-[1.02] cursor-pointer`;
    }

    return `${baseClasses} border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 cursor-pointer`;
  };

  const getIconBackgroundClasses = () => {
    if (disabled) {
      return "bg-gray-100 dark:bg-gray-700";
    }

    if (dragActive) {
      return "bg-blue-100 dark:bg-blue-900/30";
    }

    return "bg-zinc-100 dark:bg-zinc-800";
  };

  const getIconClasses = () => {
    if (disabled) {
      return "text-gray-400 dark:text-gray-500";
    }

    if (dragActive) {
      return "text-blue-600 dark:text-blue-400";
    }

    return "text-zinc-400 dark:text-zinc-500";
  };

  const getTextClasses = () => {
    if (disabled) {
      return "text-gray-500 dark:text-gray-400";
    }

    return "text-zinc-900 dark:text-zinc-100";
  };

  const getSubTextClasses = () => {
    if (disabled) {
      return "text-gray-400 dark:text-gray-500";
    }

    return "text-zinc-500 dark:text-zinc-400";
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={getDropzoneClasses()}
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
          disabled={disabled}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div
            className={`rounded-full p-6 transition-colors ${getIconBackgroundClasses()}`}
          >
            {disabled ? (
              <LockClosedIcon
                className={`h-16 w-16 transition-colors ${getIconClasses()}`}
              />
            ) : (
              <PhotoIcon
                className={`h-16 w-16 transition-colors ${getIconClasses()}`}
              />
            )}
          </div>

          <div className="space-y-2">
            <p
              className={`text-lg font-semibold transition-colors ${getTextClasses()}`}
            >
              {disabled
                ? disabledMessage
                : dragActive
                  ? "Drop your image here"
                  : "Drop image here or click to upload"}
            </p>
            <p className={`text-sm transition-colors ${getSubTextClasses()}`}>
              {disabled
                ? "Purchase credits to upload and process images"
                : `Support for PNG, JPG, GIF, WebP up to ${maxSizeInMB}MB`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
