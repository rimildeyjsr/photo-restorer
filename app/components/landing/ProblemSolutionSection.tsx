export function ProblemSolutionSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Your Precious Memories Are Fading Away
            </h3>
            <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400">
              <p>
                Every day, countless family photos deteriorate. Water damage,
                scratches, fading, and age steal away the faces and moments you
                cherish most.
              </p>
              <p>
                Traditional photo restoration costs hundreds of dollars and
                takes weeks. But what if you could restore them yourself in
                minutes?
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-[#2e6f40]">
                  5 minutes
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Average restoration time
                </div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg">
                <div className="text-2xl font-bold text-[#2e6f40]">$2-25</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  vs $200+ traditional
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                ❌ Traditional Restoration
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• $200-500+ per photo</li>
                <li>• 2-4 weeks waiting time</li>
                <li>• Risk of losing originals</li>
                <li>• Limited availability</li>
              </ul>
            </div>

            <div className="bg-[#2e6f40]/10 p-6 rounded-xl border border-[#2e6f40]/20">
              <h4 className="font-semibold text-[#2e6f40] mb-2">
                ✅ AI Photo Restoration
              </h4>
              <ul className="space-y-2 text-[#2e6f40]/80">
                <li>• $2-25 per photo</li>
                <li>• Results in seconds</li>
                <li>• Keep your originals safe</li>
                <li>• Available 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
