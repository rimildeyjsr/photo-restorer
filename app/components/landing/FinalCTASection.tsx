// app/components/landing/FinalCTASection.tsx - CLEAN WITH STRATEGIC SEO
import { Button } from "@/catalyst-ui-kit/button";
import { SparklesIcon } from "@heroicons/react/24/outline";

interface FinalCTASectionProps {
  onSignInWithGoogle: () => void;
  isLoading?: boolean;
}

export function FinalCTASection({
  onSignInWithGoogle,
  isLoading = false,
}: FinalCTASectionProps) {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Restore Your Family Memories?
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Join thousands of families who have already brought their precious
          photos back to life with our photo restoration service.
        </p>

        {/* Free Trial Badge */}
        <div className="inline-flex items-center gap-2 bg-[#2e6f40]/10 border border-[#2e6f40]/20 rounded-full px-4 py-2 mb-6">
          <SparklesIcon className="h-4 w-4 text-[#2e6f40]" />
          <span className="text-[#2e6f40] font-medium text-sm">
            No credit card required • 1 free restoration
          </span>
        </div>

        <div className="mb-8">
          <Button
            onClick={onSignInWithGoogle}
            className="px-8 py-3 text-lg"
            color="emerald"
            disabled={isLoading}
          >
            <SparklesIcon className="h-5 w-5" />
            {isLoading ? "Signing in..." : "Restore Photos Free"}
          </Button>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Professional photo restoration • Restore old photos • AI-powered
          technology
        </p>
      </div>
    </section>
  );
}
