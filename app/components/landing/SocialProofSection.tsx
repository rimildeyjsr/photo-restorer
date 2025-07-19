import { StarIcon } from "@heroicons/react/24/solid";

export function SocialProofSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="text-3xl font-bold text-[#2e6f40] mb-2">
              10,000+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Photos Restored
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#2e6f40] mb-2">4.9/5</div>
            <div className="text-gray-600 dark:text-gray-400">
              Customer Rating
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#2e6f40] mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-400">
              Always Available
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              "I couldn't believe how well it restored my grandmother's wedding
              photo from 1952. The water damage was completely gone!"
            </p>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              Sarah M., California
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              "So much faster and cheaper than traditional restoration. I've
              already restored my entire family album!"
            </p>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              Michael R., New York
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
