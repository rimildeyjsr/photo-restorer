interface ErrorDisplayProps {
  error: string;
  className?: string;
}

export function ErrorDisplay({ error, className = "" }: ErrorDisplayProps) {
  return (
    <div className={`flex justify-center ${className}`}>
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
  );
}
