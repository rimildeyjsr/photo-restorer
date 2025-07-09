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
      "relative min-h-64 rounded-xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-200 ease-in-out cursor-pointer group";

    if (disabled) {
      return `${baseClasses} border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50 cursor-not-allowed opacity-60`;
    }

    if (dragActive) {
      return `${baseClasses} border-[#2e6f40] bg-[#2e6f40]/5 dark:bg-[#2e6f40]/10 scale-[1.01] shadow-lg border-2`;
    }

    return `${baseClasses} border-gray-200 dark:border-gray-600 hover:border-[#2e6f40] dark:hover:border-[#2e6f40] hover:bg-[#2e6f40]/5 dark:hover:bg-[#2e6f40]/10 hover:shadow-md`;
  };

  const getIconBackgroundClasses = () => {
    if (disabled) {
      return "bg-gray-100 dark:bg-gray-700";
    }

    if (dragActive) {
      return "bg-[#2e6f40]/10 dark:bg-[#2e6f40]/20 scale-110";
    }

    return "bg-gray-100 dark:bg-gray-800 group-hover:bg-[#2e6f40]/10 dark:group-hover:bg-[#2e6f40]/20 group-hover:scale-105";
  };

  const getIconClasses = () => {
    if (disabled) {
      return "text-gray-400 dark:text-gray-500";
    }

    if (dragActive) {
      return "text-[#2e6f40] dark:text-[#4ade80]";
    }

    return "text-gray-400 dark:text-gray-500 group-hover:text-[#2e6f40] dark:group-hover:text-[#4ade80]";
  };

  const getTextClasses = () => {
    if (disabled) {
      return "text-gray-500 dark:text-gray-400";
    }

    if (dragActive) {
      return "text-[#2e6f40] dark:text-[#4ade80] font-semibold";
    }

    return "text-gray-900 dark:text-gray-100 group-hover:text-[#2e6f40] dark:group-hover:text-[#4ade80]";
  };

  const getSubTextClasses = () => {
    if (disabled) {
      return "text-gray-400 dark:text-gray-500";
    }

    return "text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300";
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

        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Icon with background */}
          <div
            className={`rounded-full p-4 sm:p-6 transition-all duration-200 ${getIconBackgroundClasses()}`}
          >
            {disabled ? (
              <LockClosedIcon
                className={`h-12 w-12 sm:h-16 sm:w-16 transition-all duration-200 ${getIconClasses()}`}
              />
            ) : (
              <PhotoIcon
                className={`h-12 w-12 sm:h-16 sm:w-16 transition-all duration-200 ${getIconClasses()}`}
              />
            )}
          </div>

          {/* Text content */}
          <div className="space-y-3">
            <h3
              className={`text-lg sm:text-xl font-semibold transition-all duration-200 ${getTextClasses()}`}
            >
              {disabled
                ? disabledMessage
                : dragActive
                  ? "Drop your image here"
                  : "Drop image here or click to upload"}
            </h3>

            <div className="space-y-1">
              <p
                className={`text-sm transition-all duration-200 ${getSubTextClasses()}`}
              >
                {disabled
                  ? "Purchase credits to upload and process images"
                  : `Support for PNG, JPG, GIF, WebP up to ${maxSizeInMB}MB`}
              </p>

              {!disabled && (
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Maximum file size: {maxSizeInMB}MB
                </p>
              )}
            </div>
          </div>

          {/* Upload hint for active state */}
          {!disabled && (
            <div className="flex items-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
              <div className="hidden sm:flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
                  Click
                </kbd>
                <span>or</span>
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
                  Drag & Drop
                </kbd>
              </div>
              <div className="sm:hidden">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
                  Tap to select
                </kbd>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
