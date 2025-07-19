import { BeforeAfterSlider } from "./BeforeAfterSlider";

export function GallerySection() {
  const examples = [
    {
      before: "/images/photo-two.jpg",
      after: "/images/photo-two-restored.jpg",
      beforeAlt: "Damaged vintage family portrait",
      afterAlt: "Restored vintage family portrait",
    },
    {
      before: "/images/photo-three.jpg",
      after: "/images/photo-three-restored.jpg",
      beforeAlt: "Faded old family photograph",
      afterAlt: "Restored clear family photograph",
    },
    {
      before: "/images/photo-four.jpg",
      after: "/images/photo-four-restored.jpg",
      beforeAlt: "Water-damaged vintage portrait",
      afterAlt: "Restored vintage portrait",
    },
    {
      before: "/images/photo-five.jpg",
      after: "/images/photo-five-restored.jpg",
      beforeAlt: "Scratched vintage family photo",
      afterAlt: "Restored vintage family photo",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            See the Amazing Results
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Real photos restored by our AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <BeforeAfterSlider
            beforeImage={examples[0].before}
            afterImage={examples[0].after}
            beforeAlt={examples[0].beforeAlt}
            afterAlt={examples[0].afterAlt}
          />
          <BeforeAfterSlider
            beforeImage={examples[1].before}
            afterImage={examples[1].after}
            beforeAlt={examples[1].beforeAlt}
            afterAlt={examples[1].afterAlt}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <BeforeAfterSlider
            beforeImage={examples[2].before}
            afterImage={examples[2].after}
            beforeAlt={examples[2].beforeAlt}
            afterAlt={examples[2].afterAlt}
          />
          <BeforeAfterSlider
            beforeImage={examples[3].before}
            afterImage={examples[3].after}
            beforeAlt={examples[3].beforeAlt}
            afterAlt={examples[3].afterAlt}
          />
        </div>
      </div>
    </section>
  );
}
