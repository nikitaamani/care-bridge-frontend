"use client";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg my-12">
        <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-8 text-center">
          Last updated: [Insert Date]
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p className="text-gray-700">
              At [Platform Name], we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
            <div className="text-gray-700">
              We collect the following types of information:
              <ul className="list-disc pl-6 mt-2">
                <li>Personal information (e.g., name, email, payment details)</li>
                <li>Usage data (e.g., IP address, browser type)</li>
                <li>Fundraiser-related information (e.g., descriptions, images)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
            <div className="text-gray-700">
              We use your information to:
              <ul className="list-disc pl-6 mt-2">
                <li>Process donations and fundraisers</li>
                <li>Improve our platform and services</li>
                <li>Communicate with you (e.g., updates, support)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Data Sharing</h2>
            <div className="text-gray-700">
              We do not sell your personal information. However, we may share it with:
              <ul className="list-disc pl-6 mt-2">
                <li>Payment processors to complete transactions</li>
                <li>Legal authorities if required by law</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
            <p className="text-gray-700">
              We use industry-standard measures to protect your data, including encryption and secure servers. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
            <div className="text-gray-700">
              You have the right to:
              <ul className="list-disc pl-6 mt-2">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Cookies and Tracking</h2>
            <p className="text-gray-700">
              We use cookies to enhance your experience. You can manage your cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Third-Party Links</h2>
            <p className="text-gray-700">
              Our platform may contain links to third-party websites. We are not responsible for their privacy practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this policy from time to time. You will be notified of any changes, and continued use of the platform constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this policy, please contact us at [privacy@platform.com].
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}