import { Button } from "@/catalyst-ui-kit/button";
import { PACKAGES } from "@/api/constants/package";
import { PackageType } from "@/api/types/types";
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
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Purchase Credits
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Choose a package to continue processing your images
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto">
        {Object.entries(PACKAGES).map(([key, pkg]) => (
          <div
            key={key}
            className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 bg-white dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
          >
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                  <SparklesIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {pkg.name}
                </h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                  ${pkg.price}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {pkg.credits} credits
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                  ${(pkg.price / pkg.credits).toFixed(2)} per credit
                </p>
              </div>

              <Button
                onClick={() => onPurchase(key as PackageType)}
                disabled={loading}
                className="w-full"
                color="blue"
              >
                <CreditCardIcon className="h-4 w-4" />
                {loading ? "Processing..." : "Purchase"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
        Secure payment powered by Paddle. All transactions are encrypted and
        secure.
      </div>
    </div>
  );
}
