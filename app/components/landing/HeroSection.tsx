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
          {/* Primary H1 - Targets "where can i get an old photo restored" */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Bring Your Family
            <span className="block text-[#2e6f40]">Memories Back to Life</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
            Restore old photos, repair damaged pictures, and enhance vintage
            photographs in seconds using advanced AI technology. Don't let
            precious moments fade away forever.
          </p>

          {/* Free Credit Badge */}
          <div className="inline-flex items-center gap-2 bg-[#2e6f40]/10 border border-[#2e6f40]/20 rounded-full px-4 py-2 mb-8">
            <SparklesIcon className="h-4 w-4 text-[#2e6f40]" />
            <span className="text-[#2e6f40] font-medium text-sm">
              Try it FREE - Get 1 photo restoration credit on signup
            </span>
          </div>

          {/* Hero CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={onSignInWithGoogle}
              className="px-8 py-3 text-lg"
              color="emerald"
              disabled={isLoading}
            >
              <SparklesIcon className="h-5 w-5" />
              {isLoading ? "Signing in..." : "Restore My Photos Free"}
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

        {/* Hero Image Section with SEO Optimization */}
        <div className="max-w-6xl mx-auto">
          <BeforeAfterSlider
            beforeImage="/images/photo-two.jpg"
            afterImage="/images/photo-two-restored.jpg"
            beforeAlt="Severely damaged vintage family photo with water damage, scratches, tears, and fading - before professional photo restoration service"
            afterAlt="Completely restored vintage family photo with repaired damage, enhanced colors, and crystal clarity - after AI photo restoration service"
            className="shadow-2xl h-96 md:h-[500px] lg:h-[600px]"
          />
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            👆 Drag the slider to see why our photo restoration service is the
            best place to get old photos restored
          </p>
        </div>
      </div>
    </section>
  );
}
