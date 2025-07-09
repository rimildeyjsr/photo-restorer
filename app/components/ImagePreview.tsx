import { Button } from "@/catalyst-ui-kit/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { ImageFile } from "@/types/image";

interface ImagePreviewProps {
  image: ImageFile;
  onRemove?: () => void;
  className?: string;
}

export function ImagePreview({
  image,
  onRemove,
  className = "",
}: ImagePreviewProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-center">
        <div className="relative group">
          {onRemove && (
            <Button
              plain
              onClick={onRemove}
              className="absolute top-5 right-2 rounded-full bg-white dark:bg-zinc-800 p-1.5 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-600 shadow-sm data-[hover]:!bg-white dark:data-[hover]:!bg-zinc-800 z-10"
            >
              <XMarkIcon className="h-4 w-4" data-slot="icon" />
            </Button>
          )}

          <div className="w-[410px] h-[410px] overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-700">
            <img
              src={image.preview}
              alt={image.file.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
