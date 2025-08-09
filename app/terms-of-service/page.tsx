"use client";
import { useState } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function TermsOfService() {
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header
        onSignInWithGoogle={handleSignInWithGoogle}
        isLoading={isLoading}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 lg:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                By accessing and using Photo-Restorer.com ("the Service"), you
                accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do
                not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Photo-Restorer.com provides an AI-powered photo restoration
                service that allows users to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>Upload damaged, old, or faded photographs</li>
                <li>Process images using artificial intelligence technology</li>
                <li>Download restored versions of their photographs</li>
                <li>Purchase credits to process multiple images</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. User Accounts and Registration
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                To use our service, you must:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Be at least 18 years old or have parental consent</li>
                <li>Use a valid email address for account verification</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Payment and Credits
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Our service operates on a credit-based system:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>New users receive 1 free credit upon registration</li>
                <li>
                  Additional credits can be purchased through our payment
                  processor, Paddle
                </li>
                <li>
                  Credits do not expire and remain on your account indefinitely
                </li>
                <li>Each photo restoration consumes 1 credit</li>
                <li>
                  Credits are non-transferable and non-refundable except as
                  outlined in our refund policy
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Content and Usage Rights
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Regarding uploaded content:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>You retain all ownership rights to photos you upload</li>
                <li>
                  You grant us temporary license to process your images through
                  our AI system
                </li>
                <li>
                  We do not store your original or processed images after
                  download
                </li>
                <li>
                  You are responsible for ensuring you have rights to upload and
                  process all images
                </li>
                <li>
                  You must not upload images containing illegal content,
                  copyrighted material you don't own, or inappropriate content
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Prohibited Uses
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                You agree not to use the service to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>
                  Upload images containing nudity, violence, or illegal content
                </li>
                <li>Process copyrighted images without proper authorization</li>
                <li>Attempt to reverse engineer or copy our AI technology</li>
                <li>Resell or redistribute our service without permission</li>
                <li>Use automated systems to abuse our service</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Service Availability and Limitations
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We strive to provide reliable service, however:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>Service availability is not guaranteed 100% of the time</li>
                <li>
                  We may perform maintenance that temporarily limits access
                </li>
                <li>
                  Processing times may vary based on image complexity and system
                  load
                </li>
                <li>
                  AI restoration results may vary and are not guaranteed to meet
                  specific expectations
                </li>
                <li>File size is limited to 20MB per image</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Privacy and Data Protection
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Your privacy is important to us. Please review our Privacy
                Policy for information about how we collect, use, and protect
                your personal information and uploaded content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Refund Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We offer a 30-day money-back guarantee:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>Refunds are available within 30 days of purchase</li>
                <li>Refunds apply to unused credits only</li>
                <li>Processing fees may be deducted from refund amount</li>
                <li>
                  Refund requests must be submitted to rimildeyjsr@gmail.com
                </li>
                <li>
                  We reserve the right to refuse refunds for policy violations
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Disclaimer of Warranties
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                The service is provided "as is" without warranties of any kind,
                either express or implied. We do not warrant that the service
                will be uninterrupted, error-free, or completely secure. AI
                restoration results are provided without guarantee of specific
                outcomes or quality levels.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                11. Limitation of Liability
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                In no event shall Photo-Restorer.com be liable for any direct,
                indirect, incidental, special, or consequential damages
                resulting from the use or inability to use our service,
                including but not limited to loss of data, profits, or business
                interruption.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                12. Termination
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We reserve the right to terminate or suspend accounts that
                violate these terms. Users may terminate their accounts at any
                time by contacting support. Upon termination, access to unused
                credits will be forfeited unless otherwise specified.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                13. Changes to Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes
                will be posted on this page with an updated revision date.
                Continued use of the service after changes constitutes
                acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                14. Governing Law
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                These terms shall be governed by and construed in accordance
                with the laws of the jurisdiction where Photo-Restorer.com
                operates, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                15. Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                For questions about these Terms of Service, please contact us
                at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-900 dark:text-white">
                  Email:{" "}
                  <a
                    href="mailto:rimildeyjsr@gmail.com"
                    className="text-[#2e6f40] hover:text-[#4ade80]"
                  >
                    rimildeyjsr@gmail.com
                  </a>
                </p>
                <p className="text-gray-900 dark:text-white">
                  Website:{" "}
                  <a
                    href="https://photo-restorer.com"
                    className="text-[#2e6f40] hover:text-[#4ade80]"
                  >
                    photo-restorer.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
