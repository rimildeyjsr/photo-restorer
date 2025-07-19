import { Button } from "@/catalyst-ui-kit/button";
import { PhotoIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
  onSignIn: () => void;
  onGetStarted: () => void;
}

export function Header({ onSignIn, onGetStarted }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <PhotoIcon className="h-8 w-8 text-[#2e6f40]" />
            <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              Photo Restorer
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button outline onClick={onSignIn}>
              Sign In
            </Button>
            <Button onClick={onGetStarted} color="emerald">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
