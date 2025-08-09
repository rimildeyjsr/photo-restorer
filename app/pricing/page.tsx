"use client";
import { useState } from "react";
import { Button } from "@/catalyst-ui-kit/button";
import { CheckIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function PricingPage() {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error("Failed to sign in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const packages = [
    {
      name: "Free Trial",
      price: 0,
      credits: 1,
      description: "Perfect for trying our service",
      features: [
        "1 photo restoration",
        "High-quality AI processing",
        "No credit card required",
        "Instant results",
        "Download in full resolution",
      ],
      popular: true,
      ctaText: "Start Free Trial",
    },
    {
      name: "Lite Package",
      price: 10,
      credits: 5,
      description: "Great for small photo collections",
      features: [
        "5 photo restorations",
        "High-quality AI processing",
        "Credits never expire",
        "Instant results",
        "Download in full resolution",
        "Email support",
      ],
      popular: false,
      ctaText: "Get Started",
    },
    {
      name: "Pro Package",
      price: 125,
      credits: 100,
      description: "Best value for families and professionals",
      features: [
        "100 photo restorations",
        "Professional-grade processing",
        "Credits never expire",
        "Priority processing",
        "Download in full resolution",
        "Priority email support",
        "Bulk processing",
      ],
      popular: false,
      ctaText: "Go Pro",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header
        onSignInWithGoogle={handleSignInWithGoogle}
        isLoading={isLoading}
      />

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Simple, Transparent
              <span className="block text-[#2e6f40]">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Start with a free photo restoration, then choose the package that
              fits your needs. No subscriptions, no hidden fees - just pay for
              what you use.
            </p>

            {/* Free Credit Badge */}
            <div className="inline-flex items-center gap-2 bg-[#2e6f40]/10 border border-[#2e6f40]/20 rounded-full px-4 py-2">
              <SparklesIcon className="h-4 w-4 text-[#2e6f40]" />
              <span className="text-[#2e6f40] font-medium text-sm">
                Try it FREE - Get 1 photo restoration credit on signup
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative rounded-xl border-2 p-8 bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-lg ${
                  pkg.popular
                    ? "border-[#2e6f40] shadow-md"
                    : "border-gray-200 dark:border-gray-700 hover:border-[#2e6f40]/50"
                }`}
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#2e6f40] text-white text-xs font-medium px-3 py-1 rounded-full">
                      Start Here
                    </div>
                  </div>
                )}

                <div className="text-center space-y-6">
                  {/* Package icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                      pkg.popular
                        ? "bg-[#2e6f40]/10"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    <SparklesIcon
                      className={`h-8 w-8 ${
                        pkg.popular
                          ? "text-[#2e6f40]"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    />
                  </div>

                  {/* Package details */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      {pkg.name}
                    </h3>

                    {/* Price */}
                    <div className="space-y-2">
                      <div className="text-5xl font-bold text-gray-900 dark:text-gray-100">
                        ${pkg.price}
                      </div>
                      <div className="text-xl text-[#2e6f40] font-medium">
                        {pkg.credits} {pkg.credits === 1 ? "credit" : "credits"}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Value indicator */}
                    {pkg.price > 0 && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          ${(pkg.price / pkg.credits).toFixed(2)} per
                          restoration
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4 text-left">
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-[#2e6f40] mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={handleSignInWithGoogle}
                    disabled={isLoading}
                    className={`w-full justify-center ${pkg.popular ? "" : "outline"}`}
                    color={pkg.popular ? "emerald" : undefined}
                  >
                    <SparklesIcon className="h-4 w-4" />
                    {isLoading ? "Signing in..." : pkg.ctaText}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Do credits expire?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      No, your credits never expire. Use them whenever you want
                      to restore photos.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Can I buy more credits later?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Yes, you can purchase additional credit packages anytime
                      from your dashboard.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      What if I'm not satisfied?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      We offer a 30-day money-back guarantee. If you're not
                      happy with the results, we'll refund your purchase.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      What file formats are supported?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      We support JPG, PNG, GIF, and WebP formats up to 20MB per
                      file.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      How long does processing take?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Most photos are processed within 30 seconds. Complex
                      restorations may take up to 2 minutes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Is my data secure?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Yes, we use enterprise-grade security and don't store your
                      photos after processing is complete.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Restore Your Photos?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start with a free restoration and see the amazing results for
                yourself.
              </p>
              <Button
                onClick={handleSignInWithGoogle}
                disabled={isLoading}
                className="px-8 py-3"
                color="emerald"
              >
                <SparklesIcon className="h-5 w-5" />
                {isLoading ? "Signing in..." : "Start Free Trial"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
