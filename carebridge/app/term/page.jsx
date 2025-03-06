"use client";

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg my-12">
        <h1 className="text-3xl font-bold text-center mb-6">Terms of Service</h1>
        <p className="text-gray-600 mb-8 text-center">
          Last updated: [Insert Date]
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p className="text-gray-700">
              Welcome to [Platform Name]! By accessing or using our platform, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
            <p className="text-gray-700">
              You must be at least 18 years old to use our platform. By using [Platform Name], you represent that you meet this requirement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
            <p className="text-gray-700">
              You agree not to engage in any fraudulent, illegal, or harmful activities on our platform. This includes, but is not limited to, harassment, scams, or posting prohibited content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Fundraiser Rules</h2>
            <p className="text-gray-700">
              All fundraisers must comply with our guidelines. Prohibited content includes hate speech, illegal activities, and misleading information. We reserve the right to remove any fundraiser that violates these rules.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Donations</h2>
            <p className="text-gray-700">
              Donations made through [Platform Name] are non-refundable. A small processing fee may be deducted from each donation. Please review our donation policy for more details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Termination</h2>
            <p className="text-gray-700">
              We reserve the right to suspend or terminate your account at any time for violations of these terms. You may also terminate your account at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
            <p className="text-gray-700">
              [Platform Name] is not liable for any damages arising from the use of our platform. This includes, but is not limited to, direct, indirect, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
            <p className="text-gray-700">
              These terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved in the courts of [Your Jurisdiction].
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Changes to Terms</h2>
            <p className="text-gray-700">
              We may update these terms from time to time. You will be notified of any changes, and continued use of the platform constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about these terms, please contact us at [support@platform.com].
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}