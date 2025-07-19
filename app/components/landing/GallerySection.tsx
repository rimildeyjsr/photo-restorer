import { BeforeAfterSlider } from "./BeforeAfterSlider";

export function GallerySection() {
  const examples = [
    {
      before:
        "https://images.unsplash.com/photo-1604078250436-81d77b84c2b9?w=500&h=300&fit=crop&crop=center",
      after:
        "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=500&h=300&fit=crop&crop=center",
      beforeAlt: "Damaged vintage family photo",
      afterAlt: "Restored vintage family photo",
    },
    {
      before:
        "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=500&h=300&fit=crop&crop=center",
      after:
        "https://images.unsplash.com/photo-1604078250436-81d77b84c2b9?w=500&h=300&fit=crop&crop=center",
      beforeAlt: "Faded old photograph",
      afterAlt: "Restored clear photograph",
    },
    {
      before:
        "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=500&h=300&fit=crop&crop=center",
      after:
        "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=500&h=300&fit=crop&crop=center",
      beforeAlt: "Water-damaged family portrait",
      afterAlt: "Restored family portrait",
    },
    {
      before:
        "https://images.unsplash.com/photo-1604078250436-81d77b84c2b9?w=500&h=300&fit=crop&crop=center",
      after:
        "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=500&h=300&fit=crop&crop=center",
      beforeAlt: "Scratched vintage photo",
      afterAlt: "Restored vintage photo",
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
