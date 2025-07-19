import { PhotoIcon } from "@heroicons/react/24/outline";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <PhotoIcon className="h-6 w-6 text-[#2e6f40]" />
              <span className="ml-2 text-lg font-bold">Photo Restorer</span>
            </div>
            <p className="text-gray-400">
              Bringing family memories back to life with AI technology.
            </p>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Product</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#how-it-works" className="hover:text-white">
                  How it works
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#examples" className="hover:text-white">
                  Examples
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Support</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#help" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Legal</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#privacy" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#refund" className="hover:text-white">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Photo Restorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
