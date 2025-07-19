import { Button } from "@/catalyst-ui-kit/button";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

interface HeroSectionProps {
  onSignInWithGoogle: () => void;
  onSeeExamples: () => void;
  isLoading?: boolean;
}

export function HeroSection({
  onSignInWithGoogle,
  onSeeExamples,
  isLoading = false,
}: HeroSectionProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Bring Your Family
            <span className="block text-[#2e6f40]">Memories Back to Life</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Restore damaged, faded, and old family photos in seconds using
            advanced AI technology. Don't let precious moments fade away
            forever.
          </p>

          {/* Hero CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={onSignInWithGoogle}
              className="px-8 py-3 text-lg"
              color="emerald"
              disabled={isLoading}
            >
              <SparklesIcon className="h-5 w-5" />
              {isLoading ? "Signing in..." : "Start Restoring Photos"}
            </Button>
            <Button
              outline
              onClick={onSeeExamples}
              className="px-8 py-3 text-lg"
            >
              See Examples
            </Button>
          </div>
        </div>

        {/* Hero Before/After Slider */}
        <div className="max-w-4xl mx-auto">
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&h=400&fit=crop&crop=center"
            afterImage="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=400&fit=crop&crop=center"
            className="shadow-2xl"
          />
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Drag the slider to see the difference ✨
          </p>
        </div>
      </div>
    </section>
  );
}
