"use client";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSolutionSection } from "@/components/landing/ProblemSolutionSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  const handleGetStarted = () => {
    // Redirect to your app
    window.location.href = "/app";
  };

  const handleSignIn = () => {
    // Redirect to your app (where authentication happens)
    window.location.href = "/app";
  };

  const handleSeeExamples = () => {
    // Scroll to gallery section
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header onSignIn={handleSignIn} onGetStarted={handleGetStarted} />

      <HeroSection
        onGetStarted={handleGetStarted}
        onSeeExamples={handleSeeExamples}
      />

      <ProblemSolutionSection />

      <HowItWorksSection />

      <div id="gallery">
        <GallerySection />
      </div>

      <SocialProofSection />

      <div id="pricing">
        <PricingSection onGetStarted={handleGetStarted} />
      </div>

      <FinalCTASection onGetStarted={handleGetStarted} />

      <Footer />
    </div>
  );
}
