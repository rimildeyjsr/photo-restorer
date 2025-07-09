import { XCircleIcon } from "@heroicons/react/24/outline";

interface ErrorDisplayProps {
  error: string;
  onDismiss: () => void;
  className?: string;
}

export function ErrorDisplay({
  error,
  onDismiss,
  className = "",
}: ErrorDisplayProps) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4 ${className}`}
    >
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          {/* Error icon */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <svg
                className="h-5 w-5 text-red-600 dark:text-red-400"
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
          </div>

          {/* Error content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-red-800 dark:text-red-300 font-medium">
              {error}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onDismiss}
            className="flex-shrink-0 rounded-full p-1 text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
