"use client";
import { useState } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Photo-Restorer.com ("we," "our," or "us") is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website and use our photo restoration service. Please
                read this privacy policy carefully.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Personal Information
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide
                to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4 mb-6">
                <li>Register for an account using Google authentication</li>
                <li>Make a purchase or transaction</li>
                <li>Contact us with inquiries or support requests</li>
                <li>Subscribe to our newsletter or marketing communications</li>
              </ul>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                This personal information may include:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4 mb-6">
                <li>Name and email address (from Google account)</li>
                <li>Profile picture (from Google account)</li>
                <li>
                  Payment information (processed by Paddle, not stored by us)
                </li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Image Data
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                When you use our photo restoration service, we temporarily
                process:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4 mb-6">
                <li>Original photographs you upload for restoration</li>
                <li>Processed/restored versions of your photographs</li>
                <li>Metadata associated with uploaded files</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Automatically Collected Information
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We may automatically collect certain information about your
                device and usage:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>IP address and geographical location</li>
                <li>Browser type and version</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website or source</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>To provide and maintain our photo restoration service</li>
                <li>To process your uploaded images using our AI technology</li>
                <li>To manage your account and credits</li>
                <li>To process payments and transactions</li>
                <li>To send you service-related communications</li>
                <li>To provide customer support and respond to inquiries</li>
                <li>To improve our service and develop new features</li>
                <li>To comply with legal obligations</li>
                <li>To protect against fraud and security threats</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Image Processing and Storage
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                <strong>Important:</strong> We prioritize the privacy and
                security of your photographs:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>
                  <strong>Temporary Processing:</strong> Images are only stored
                  temporarily during the restoration process
                </li>
                <li>
                  <strong>No Long-term Storage:</strong> We do not permanently
                  store your original or restored images
                </li>
                <li>
                  <strong>Automatic Deletion:</strong> Images are automatically
                  deleted from our servers after processing is complete
                </li>
                <li>
                  <strong>Secure Transmission:</strong> All image uploads and
                  downloads are encrypted in transit
                </li>
                <li>
                  <strong>Third-party Processing:</strong> Images are processed
                  using Replicate's AI service under strict privacy terms
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We may share your information in the following situations:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Service Providers
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4 mb-6">
                <li>
                  <strong>Google:</strong> For authentication services
                </li>
                <li>
                  <strong>Paddle:</strong> For payment processing
                </li>
                <li>
                  <strong>Replicate:</strong> For AI image processing
                </li>
                <li>
                  <strong>Hosting providers:</strong> For website and database
                  hosting
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Legal Requirements
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We may disclose your information if required to do so by law or
                in response to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>Valid legal processes or government requests</li>
                <li>Enforce our terms of service</li>
                <li>Protect our rights, property, or safety</li>
                <li>Protect the rights, property, or safety of others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Data Security
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We implement appropriate security measures to protect your
                information:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure authentication through Google OAuth</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and monitoring</li>
                <li>Secure payment processing through Paddle</li>
                <li>Compliance with industry security standards</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                However, no method of transmission over the internet is 100%
                secure. While we strive to protect your information, we cannot
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>Maintain your login session</li>
                <li>Remember your preferences</li>
                <li>Analyze website usage and performance</li>
                <li>Provide personalized experiences</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                You can control cookie settings through your browser
                preferences, though some functionality may be limited if cookies
                are disabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Your Privacy Rights
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                You have the following rights regarding your personal
                information:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>
                  <strong>Access:</strong> Request information about the
                  personal data we hold about you
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  or incomplete information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  information
                </li>
                <li>
                  <strong>Portability:</strong> Request a copy of your data in a
                  portable format
                </li>
                <li>
                  <strong>Withdrawal:</strong> Withdraw consent for data
                  processing where applicable
                </li>
                <li>
                  <strong>Objection:</strong> Object to certain types of data
                  processing
                </li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                To exercise these rights, please contact us at
                rimildeyjsr@gmail.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Children's Privacy
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our service is not intended for children under 18 years of age.
                We do not knowingly collect personal information from children
                under 18. If you become aware that a child has provided us with
                personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. International Data Transfers
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Your information may be transferred to and processed in
                countries other than your own. We ensure that such transfers
                comply with applicable data protection laws and that appropriate
                safeguards are in place to protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                11. Data Retention
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We retain different types of information for different periods:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>
                  <strong>Account Information:</strong> Until you delete your
                  account or request deletion
                </li>
                <li>
                  <strong>Transaction Records:</strong> As required by law for
                  tax and accounting purposes
                </li>
                <li>
                  <strong>Images:</strong> Deleted immediately after processing
                  is complete
                </li>
                <li>
                  <strong>Usage Data:</strong> Aggregated and anonymized data
                  may be retained for analytics
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                12. Third-Party Links
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices of these external
                sites. We encourage you to review the privacy policies of any
                third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                13. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any significant changes by posting the new policy
                on this page with an updated effective date. Your continued use
                of our service after any modifications constitutes acceptance of
                the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                14. Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
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

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                15. Compliance
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                This Privacy Policy is designed to comply with applicable data
                protection regulations, including GDPR, CCPA, and other relevant
                privacy laws. We are committed to protecting your privacy rights
                regardless of your location.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
