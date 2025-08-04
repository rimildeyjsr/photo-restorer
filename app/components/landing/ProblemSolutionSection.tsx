import { SparklesIcon } from "@heroicons/react/24/outline";

export function ProblemSolutionSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Where Can I Get Old Photos Restored? You're in the Right Place
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stop wondering where to get old photos restored. Our professional
            photo restoration service is the modern solution to restore old
            pictures and repair damaged photographs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Your Precious Family Photos Are Deteriorating Every Day
            </h3>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400">
              <p>
                <strong>Searching for where to get old photos restored?</strong>{" "}
                Traditional photo restoration services are expensive, slow, and
                risky. Water damage, scratches, tears, and fading destroy your
                irreplaceable family memories while you wait weeks for
                professional photo restoration.
              </p>
              <p>
                <strong>The old way:</strong> Traditional photo restoration
                services cost $75-500+ per photo and take 2-6 weeks. You risk
                losing original photographs, and many services can't handle
                severely damaged pictures.
              </p>
              <p>
                <strong>The new way:</strong> Our AI photo restoration service
                instantly restores old pictures, repairs damaged photos, and
                enhances vintage photographs in seconds - not weeks.
              </p>
            </div>

            {/* Problem Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-red-200">
                <div className="text-2xl font-bold text-red-600">$300+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Traditional photo restoration cost
                </div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-red-200">
                <div className="text-2xl font-bold text-red-600">3-6 weeks</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Waiting time for results
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Traditional vs AI Comparison */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-red-200">
              <h4 className="font-bold text-red-600 mb-3 text-lg">
                ❌ Traditional Photo Restoration Services
              </h4>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>
                    <strong>$75-500+ per photo</strong> - Professional photo
                    restoration services are extremely expensive
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>
                    <strong>2-6 weeks waiting time</strong> - Slow turnaround
                    for photo restoration
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>
                    <strong>Risk losing originals</strong> - Must mail precious
                    photographs
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>
                    <strong>Limited availability</strong> - Few places offer
                    photo restoration services
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>
                    <strong>Inconsistent quality</strong> - Results vary by
                    technician skill
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-[#2e6f40]/10 p-6 rounded-xl border-2 border-[#2e6f40]/30 shadow-lg">
              <h4 className="font-bold text-[#2e6f40] mb-3 text-lg">
                ✅ Our AI Photo Restoration Service
              </h4>
              <ul className="space-y-3 text-[#2e6f40]/90 dark:text-[#4ade80]/90">
                <li className="flex items-start">
                  <span className="text-[#2e6f40] mr-2">•</span>
                  <span>
                    <strong>First photo restoration FREE</strong> - Try our
                    service at no cost
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2e6f40] mr-2">•</span>
                  <span>
                    <strong>Then $2-25 per photo</strong> - Affordable photo
                    restoration services
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2e6f40] mr-2">•</span>
                  <span>
                    <strong>30-second results</strong> - Instant photo
                    restoration, not weeks
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2e6f40] mr-2">•</span>
                  <span>
                    <strong>Keep originals safe</strong> - Upload photos
                    digitally, no mailing required
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2e6f40] mr-2">•</span>
                  <span>
                    <strong>Available 24/7</strong> - Restore old pictures
                    anytime, anywhere
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2e6f40] mr-2">•</span>
                  <span>
                    <strong>Consistent AI quality</strong> - Professional photo
                    restoration every time
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
