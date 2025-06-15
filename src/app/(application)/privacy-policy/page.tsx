import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Your Store Name',
  description: 'Privacy Policy for Your Store Name',
};

export default function PrivacyPolicy() {
  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Privacy Policy</h1>

      <div className='space-y-6 text-gray-600'>
        <section>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            1. Information We Collect
          </h2>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul className='list-disc ml-6 mt-2'>
            <li>Name and contact information</li>
            <li>Billing and shipping address</li>
            <li>Payment information</li>
            <li>Order history</li>
            <li>Account credentials</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            2. How We Use Your Information
          </h2>
          <p>We use the information we collect to:</p>
          <ul className='list-disc ml-6 mt-2'>
            <li>Process your orders and payments</li>
            <li>Communicate with you about your orders</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Prevent fraud and enhance security</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            3. Information Sharing
          </h2>
          <p>
            We do not sell your personal information. We may share your
            information with:
          </p>
          <ul className='list-disc ml-6 mt-2'>
            <li>Service providers who assist in our operations</li>
            <li>Payment processors</li>
            <li>Shipping partners</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            4. Your Rights
          </h2>
          <p>You have the right to:</p>
          <ul className='list-disc ml-6 mt-2'>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            5. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className='mt-2'>Email: {/* TODO: Email address here */}</p>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            6. Updates to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. The latest
            version will always be posted on this page.
          </p>
          <p className='mt-2'>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </div>
  );
}
