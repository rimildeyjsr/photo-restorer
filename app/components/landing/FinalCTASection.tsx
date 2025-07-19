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
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Join thousands of families who have already brought their precious
          photos back to life.
        </p>

        <Button
          onClick={onSignInWithGoogle}
          className="px-8 py-3 text-lg"
          color="emerald"
          disabled={isLoading}
        >
          <SparklesIcon className="h-5 w-5" />
          {isLoading ? "Signing in..." : "Start Restoring Now"}
        </Button>
      </div>
    </section>
  );
}
