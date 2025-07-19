"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
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
  const { user, loading, signInWithGoogle } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  // If user is already authenticated, redirect to app
  if (user && !loading) {
    window.location.href = "/app";
    return null;
  }

  const handleSignInWithGoogle = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      // User will be redirected to /app automatically by the auth state change
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSeeExamples = () => {
    // Scroll to gallery section
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e6f40]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header
        onSignInWithGoogle={handleSignInWithGoogle}
        isLoading={isSigningIn}
      />

      <HeroSection
        onSignInWithGoogle={handleSignInWithGoogle}
        onSeeExamples={handleSeeExamples}
        isLoading={isSigningIn}
      />

      <ProblemSolutionSection />

      <HowItWorksSection />

      <div id="gallery">
        <GallerySection />
      </div>

      <SocialProofSection />

      <div id="pricing">
        <PricingSection
          onSignInWithGoogle={handleSignInWithGoogle}
          isLoading={isSigningIn}
        />
      </div>

      <FinalCTASection
        onSignInWithGoogle={handleSignInWithGoogle}
        isLoading={isSigningIn}
      />

      <Footer />
    </div>
  );
}
