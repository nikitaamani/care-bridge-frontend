'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function KnowledgeBase() {
    return (
        <div>
            <Navbar />
            <main className="max-w-4xl mx-auto p-14">
                <h1 className="text-3xl font-bold mb-6">Knowledge Base</h1>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">User Authentication</h2>
                    <p>
                        Our platform implements secure authentication using JWT (JSON Web Tokens). Users can register, log in, and manage their accounts safely.
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>Passwords are securely hashed using bcrypt.</li>
                        <li>JWT tokens are issued upon login and expire after a set period.</li>
                        <li>Email verification can be enabled for added security.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Donation Processing</h2>
                    <p>
                        We support donations through Stripe and PayPal, providing a seamless and secure way to contribute.
                    </p>
                    <h3 className="text-xl font-medium mt-4">Stripe Integration</h3>
                    <ul className="list-disc pl-6 mt-2">
                        <li>Secure credit/debit card transactions.</li>
                        <li>Automatic currency conversion.</li>
                        <li>Instant transaction processing with detailed charge metadata.</li>
                    </ul>
                    <h3 className="text-xl font-medium mt-4">PayPal Integration</h3>
                    <ul className="list-disc pl-6 mt-2">
                        <li>Supports PayPal accounts and guest checkout.</li>
                        <li>Users can link their PayPal accounts for quick payments.</li>
                        <li>Provides transaction history and refunds directly via PayPal.</li>
                        <li>Easy and secure payment processing with buyer protection.</li>
                        <li>Integration with multiple currencies for global donors.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Profile Management</h2>
                    <p>
                        Users can update their profiles, upload profile pictures, and manage account details through a dedicated dashboard.
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>Profile pictures are uploaded securely using Multer.</li>
                        <li>Users can edit their personal information and preferences.</li>
                        <li>Account deletion options are available upon request.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Security Best Practices</h2>
                    <p>
                        Our platform follows industry best practices to ensure data security and user privacy.
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>All sensitive data is encrypted before storage.</li>
                        <li>Rate limiting prevents brute-force attacks on authentication endpoints.</li>
                        <li>Two-factor authentication (2FA) is available for added security.</li>
                        <li>Regular security audits to maintain platform integrity.</li>
                        <li>Continuous monitoring and fraud detection mechanisms.</li>
                    </ul>
                </section>
            </main>
            <Footer />
        </div>
    );
}
