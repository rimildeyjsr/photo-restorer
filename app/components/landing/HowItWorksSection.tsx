// app/components/landing/HowItWorksSection.tsx - CLEAN WITH STRATEGIC SEO
import {
  CloudArrowUpIcon,
  SparklesIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

export function HowItWorksSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How to Restore Old Photos in 3 Simple Steps
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No technical skills required. Just upload, wait, and download.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#2e6f40]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CloudArrowUpIcon className="h-8 w-8 text-[#2e6f40]" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              1. Upload Your Photo
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Drag and drop your damaged photo. We support all common formats up
              to 20MB.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#2e6f40]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <SparklesIcon className="h-8 w-8 text-[#2e6f40]" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              2. AI Magic Happens
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Our advanced AI analyzes and restores your photo automatically in
              seconds.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#2e6f40]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowDownIcon className="h-8 w-8 text-[#2e6f40]" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              3. Download & Share
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Get your restored photo in high quality and share it with family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
