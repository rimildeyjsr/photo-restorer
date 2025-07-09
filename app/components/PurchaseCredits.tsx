import { Button } from "@/catalyst-ui-kit/button";
import { PACKAGES, PackageType } from "@/lib/constants/packages";
import { CreditCardIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface PurchaseCreditsProps {
  onPurchase: (packageName: PackageType) => void;
  loading?: boolean;
  className?: string;
}

export function PurchaseCredits({
  onPurchase,
  loading = false,
  className = "",
}: PurchaseCreditsProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2e6f40]/10 mb-4">
          <SparklesIcon className="h-8 w-8 text-[#2e6f40]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Purchase Credits
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Choose a package to continue processing your images. Credits never
          expire.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
        {Object.entries(PACKAGES).map(([key, pkg]) => {
          const isPopular = pkg.credits === 50; // Example: mark 50 credits as popular

          return (
            <div
              key={key}
              className={`relative rounded-xl border-2 p-6 bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-lg ${
                isPopular
                  ? "border-[#2e6f40] shadow-md"
                  : "border-gray-200 dark:border-gray-700 hover:border-[#2e6f40]/50"
              }`}
            >
              {/* Popular badge */}
              {isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#2e6f40] text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center space-y-4">
                {/* Package icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                    isPopular
                      ? "bg-[#2e6f40]/10"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  <SparklesIcon
                    className={`h-6 w-6 ${
                      isPopular
                        ? "text-[#2e6f40]"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  />
                </div>

                {/* Package details */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {pkg.name}
                  </h3>

                  {/* Price */}
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      ${pkg.price}
                    </div>
                    <div className="text-lg text-[#2e6f40] font-medium">
                      {pkg.credits} credits
                    </div>
                  </div>

                  {/* Value indicator */}
                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      ${(pkg.price / pkg.credits).toFixed(2)} per credit
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2e6f40]"></div>
                    <span>Process {pkg.credits} images</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2e6f40]"></div>
                    <span>Credits never expire</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2e6f40]"></div>
                    <span>High-quality restoration</span>
                  </div>
                </div>

                {/* Purchase button */}
                <Button
                  onClick={() => onPurchase(key as PackageType)}
                  disabled={loading}
                  className={`w-full justify-center ${isPopular ? "" : "outline"}`}
                  color={isPopular ? "emerald" : undefined}
                >
                  <CreditCardIcon className="h-4 w-4" />
                  {loading ? "Processing..." : "Purchase Package"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="text-center space-y-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center">
              <div className="w-2 h-2 rounded bg-[#2e6f40]"></div>
            </div>
            <span>Secure payment powered by Paddle</span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            All transactions are encrypted and secure. No subscription required.
          </p>
        </div>
      </div>
    </div>
  );
}
