import { Button } from "@/catalyst-ui-kit/button";
import { CheckIcon } from "@heroicons/react/24/outline";

interface PricingSectionProps {
  onSignInWithGoogle: () => void;
  isLoading?: boolean;
}

export function PricingSection({
  onSignInWithGoogle,
  isLoading = false,
}: PricingSectionProps) {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Start with 1 free restoration, then pay only for what you use.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Trial */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-2 border-[#2e6f40] relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-[#2e6f40] text-white text-sm font-medium px-3 py-1 rounded-full">
                Start Here
              </div>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Free Trial
            </h4>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              $0
            </div>
            <div className="text-[#2e6f40] font-medium mb-6">
              1 photo restoration
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-[#2e6f40] mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Try the service free
                </span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-[#2e6f40] mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  High-quality results
                </span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-[#2e6f40] mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  No credit card required
                </span>
              </li>
            </ul>

            <Button
              onClick={onSignInWithGoogle}
              className="w-full"
              color="emerald"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Try Free Now"}
            </Button>
          </div>

          {/* Lite Package */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Lite Package
            </h4>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              $10
            </div>
            <div className="text-[#2e6f40] font-medium mb-6">
              5 photo restorations
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-[#2e6f40] mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Process 5 photos
                </span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-[#2e6f40] mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  High-quality results
                </span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-[#2e6f40] mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Credits never expire
                </span>
              </li>
            </ul>

            <Button
              onClick={onSignInWithGoogle}
              className="w-full"
              outline
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Get Started"}
            </Button>
          </div>

          {/* Pro Package */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                Best Value
              </div>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Pro Package
            </h4>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              $125
            </div>
            <div className="text-[#2e6f40] font-medium mb-6">
              100 photo restorations
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-[#2e6f40] mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Process 100 photos
                </span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-[#2e6f40] mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  High-quality results
                </span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-[#2e6f40] mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Credits never expire
                </span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="h-4 w-4 text-[#2e6f40] mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Priority processing
                </span>
              </li>
            </ul>

            <Button
              onClick={onSignInWithGoogle}
              className="w-full"
              outline
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Get Started"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
