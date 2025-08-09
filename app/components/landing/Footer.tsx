import { PhotoIcon } from "@heroicons/react/24/outline";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <PhotoIcon className="h-6 w-6 text-[#2e6f40]" />
              <span className="ml-2 text-lg font-bold">Photo Restorer</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Bringing family memories back to life with AI technology.
              Professional photo restoration service for damaged, old, and faded
              photographs.
            </p>
            <div className="mb-4">
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
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/#gallery"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Examples
                </a>
              </li>
              <li>
                <a
                  href="/#how-it-works"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/app"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/terms-of-service"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/refund-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Photo Restorer. All rights reserved.
            </p>

            {/* Additional Footer Info */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-400">
              <span>Professional photo restoration services</span>
              <span className="hidden md:inline">•</span>
              <span>Powered by AI technology</span>
              <span className="hidden md:inline">•</span>
              <span>Secure & private processing</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
