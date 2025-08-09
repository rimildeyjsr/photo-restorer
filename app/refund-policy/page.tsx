"use client";
import { useState } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { useAuth } from "@/hooks/useAuth";

export default function RefundPolicy() {
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
            Refund Policy
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Our Commitment to Customer Satisfaction
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                At Photo-Restorer.com, we are committed to providing
                high-quality photo restoration services. We stand behind our
                service and offer a refund policy to ensure your satisfaction
                with our AI-powered photo restoration technology.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. 7-Day Money-Back Guarantee
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We offer a 7-day money-back guarantee on all credit purchases.
                If you are not satisfied with our photo restoration service, you
                may request a refund within 7 days of your purchase for unused
                credits only.
              </p>

              <div className="bg-[#2e6f40]/10 border border-[#2e6f40]/20 rounded-lg p-6 my-6">
                <h3 className="text-lg font-semibold text-[#2e6f40] mb-2">
                  ✓ 7-Day Guarantee Includes:
                </h3>
                <ul className="list-disc list-inside text-[#2e6f40]/90 space-y-2 ml-4">
                  <li>Refund of unused credits only</li>
                  <li>Fast processing of eligible requests</li>
                  <li>Transparent refund process</li>
                  <li>Multiple refund method options</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Refund Eligibility
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Eligible for Refund:
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4 mb-6">
                <li>
                  <strong>Unused Credits Only:</strong> Credits that have not
                  been used for photo restoration
                </li>
                <li>
                  <strong>Recent Purchases:</strong> Credit packages purchased
                  within the last 7 days
                </li>
                <li>
                  <strong>Technical Issues:</strong> Service failures or
                  technical problems preventing use of credits
                </li>
                <li>
                  <strong>Billing Errors:</strong> Incorrect charges or
                  duplicate transactions
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Not Eligible for Refund:
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>
                  <strong>Used Credits:</strong> Credits that have been
                  successfully used for photo restoration
                </li>
                <li>
                  <strong>Expired Window:</strong> Requests made more than 7
                  days after purchase
                </li>
                <li>
                  <strong>Policy Violations:</strong> Accounts terminated for
                  violating terms of service
                </li>
                <li>
                  <strong>Fraudulent Activity:</strong> Suspected fraud or abuse
                  of the refund system
                </li>
                <li>
                  <strong>Free Credits:</strong> The initial free credit
                  provided upon registration
                </li>
                <li>
                  <strong>Satisfaction Issues:</strong> Subjective
                  dissatisfaction with restoration quality after successful
                  processing
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. How to Request a Refund
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                To request a refund for unused credits, please follow these
                steps:
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2e6f40] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Contact Our Support Team
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Send an email to{" "}
                      <a
                        href="mailto:rimildeyjsr@gmail.com"
                        className="text-[#2e6f40] hover:text-[#4ade80]"
                      >
                        rimildeyjsr@gmail.com
                      </a>{" "}
                      with "Refund Request" in the subject line.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2e6f40] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Provide Required Information
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Include the following details in your email:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                      <li>Your account email address</li>
                      <li>Transaction ID or purchase date</li>
                      <li>Reason for refund request</li>
                      <li>Number of unused credits</li>
                      <li>
                        Confirmation that you understand only unused credits are
                        refundable
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2e6f40] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Account Review
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      We will review your account to verify unused credits and
                      respond within 24-48 hours with our decision.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2e6f40] text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Refund Processing
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Approved refunds for unused credits are processed within
                      5-7 business days back to your original payment method.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Refund Processing Times
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Refund processing times depend on your original payment method:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>
                  <strong>Credit/Debit Cards:</strong> 3-5 business days after
                  approval
                </li>
                <li>
                  <strong>PayPal:</strong> 1-2 business days after approval
                </li>
                <li>
                  <strong>Bank Transfers:</strong> 5-7 business days after
                  approval
                </li>
                <li>
                  <strong>Digital Wallets:</strong> 1-3 business days after
                  approval
                </li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                Please note that your bank or payment provider may require
                additional processing time before the refund appears in your
                account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Partial Refunds
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Refunds are calculated based on unused credits only:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>
                  <strong>Mixed Usage:</strong> Only the value of unused credits
                  will be refunded
                </li>
                <li>
                  <strong>Processing Fees:</strong> Payment processing fees
                  (typically 2-3%) may be deducted from refunds
                </li>
                <li>
                  <strong>Promotional Credits:</strong> Bonus or promotional
                  credits are not eligible for cash refunds
                </li>
                <li>
                  <strong>Currency Conversion:</strong> Refunds are processed in
                  the original purchase currency
                </li>
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6 dark:bg-amber-900/10 dark:border-amber-900/20">
                <p className="text-amber-800 dark:text-amber-200 text-sm">
                  <strong>Example:</strong> If you purchased 10 credits for $20
                  and used 6 credits, you would be eligible for a refund of $8
                  (4 unused credits) minus processing fees.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Important Limitations
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 dark:bg-red-900/10 dark:border-red-900/20">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">
                  ⚠️ Please Note:
                </h3>
                <ul className="list-disc list-inside text-red-700 dark:text-red-300 space-y-2 ml-4">
                  <li>
                    <strong>No Refunds for Used Credits:</strong> Once a credit
                    is used to process a photo, it cannot be refunded regardless
                    of satisfaction with results
                  </li>
                  <li>
                    <strong>7-Day Window:</strong> Refund requests must be made
                    within 7 days of purchase
                  </li>
                  <li>
                    <strong>Service Quality:</strong> Refunds are not available
                    for subjective dissatisfaction with restoration results
                  </li>
                  <li>
                    <strong>Free Trial:</strong> The initial free credit is not
                    eligible for cash refund
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Alternative Solutions
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                If you're unsatisfied with restoration results, consider these
                alternatives:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>
                  <strong>Reprocessing:</strong> We may offer to reprocess your
                  image with different settings
                </li>
                <li>
                  <strong>Technical Support:</strong> Contact us for tips on
                  optimal image preparation
                </li>
                <li>
                  <strong>Service Credits:</strong> In exceptional cases, we may
                  offer service credits for future use
                </li>
                <li>
                  <strong>Feedback:</strong> Help us improve by sharing your
                  experience
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Dispute Resolution
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                If you disagree with a refund decision:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>
                  <strong>Appeal Process:</strong> Request a review by emailing
                  our support team
                </li>
                <li>
                  <strong>Documentation:</strong> Provide additional information
                  supporting your request
                </li>
                <li>
                  <strong>Final Decision:</strong> Management review for complex
                  cases
                </li>
                <li>
                  <strong>External Options:</strong> Contact your payment
                  provider if needed
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Policy Updates
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                This refund policy may be updated from time to time. Changes
                will be posted on this page with an updated effective date. For
                purchases made before policy changes, the original policy terms
                at the time of purchase will apply.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                11. Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                For all refund-related inquiries:
              </p>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-900 dark:text-white mb-2">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:rimildeyjsr@gmail.com"
                    className="text-[#2e6f40] hover:text-[#4ade80]"
                  >
                    rimildeyjsr@gmail.com
                  </a>
                </p>
                <p className="text-gray-900 dark:text-white mb-2">
                  <strong>Subject Line:</strong> "Refund Request" (for faster
                  processing)
                </p>
                <p className="text-gray-900 dark:text-white mb-2">
                  <strong>Response Time:</strong> 24-48 hours
                </p>
                <p className="text-gray-900 dark:text-white">
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://photo-restorer.com"
                    className="text-[#2e6f40] hover:text-[#4ade80]"
                  >
                    photo-restorer.com
                  </a>
                </p>
              </div>
            </section>

            <div className="mt-12 p-6 bg-[#2e6f40]/10 border border-[#2e6f40]/20 rounded-lg">
              <h3 className="text-lg font-semibold text-[#2e6f40] mb-3">
                💡 Before Purchasing
              </h3>
              <p className="text-[#2e6f40]/90 leading-relaxed">
                We recommend starting with your free credit to test our service
                quality. This helps ensure you're satisfied with our restoration
                results before purchasing additional credits. Remember, only
                unused credits are eligible for refunds within 7 days of
                purchase.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
