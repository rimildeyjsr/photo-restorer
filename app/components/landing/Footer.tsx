import { PhotoIcon } from "@heroicons/react/24/outline";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <PhotoIcon className="h-6 w-6 text-[#2e6f40]" />
            <span className="ml-2 text-lg font-bold">Photo Restorer</span>
          </div>
          <p className="text-gray-400 mb-4">
            Bringing family memories back to life with AI technology.
          </p>
          <div className="mb-8">
            <p className="text-gray-400 mb-2">
              For any queries/support reach out to
            </p>
            <a
              href="mailto:rimildeyjsr@gmail.com"
              className="text-[#2e6f40] hover:text-[#4ade80] transition-colors"
            >
              rimildeyjsr@gmail.com
            </a>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Photo Restorer. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
