import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Your Store Name',
  description: 'Terms and Conditions for Your Store Name',
};

export default function Terms() {
  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>Terms and Conditions</h1>

      <div className='space-y-6 text-gray-600'>
        <section>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            1. Agreement to Terms
          </h2>
          <p>
            By accessing and using this website, you agree to be bound by these
            Terms and Conditions. If you do not agree to these terms, please do
            not use our services.
          </p>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            2. Use of Services
          </h2>
          <p>
            Our services are available to users who are at least 18 years old.
            You agree to:
          </p>
          <ul className='list-disc ml-6 mt-2'>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Use our services in compliance with all applicable laws</li>
            <li>Not engage in any fraudulent or harmful activities</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            3. Product Information
          </h2>
          <p>
            We strive to display accurate product information, including prices
            and availability. However, we reserve the right to:
          </p>
          <ul className='list-disc ml-6 mt-2'>
            <li>Modify prices without notice</li>
            <li>Limit quantities of products</li>
            <li>Refuse service to anyone</li>
            <li>Correct any errors in product information</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            4. Orders and Payment
          </h2>
          <p>By placing an order, you:</p>
          <ul className='list-disc ml-6 mt-2'>
            <li>Agree to pay the full amount specified</li>
            <li>Confirm that all information provided is accurate</li>
            <li>Authorize us to process your payment</li>
            <li>Understand that all prices are in the specified currency</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            5. Shipping and Delivery
          </h2>
          <p>
            We aim to process and ship orders promptly, but we cannot guarantee
            specific delivery times. Shipping costs and methods are:
          </p>
          <ul className='list-disc ml-6 mt-2'>
            <li>Calculated based on your location and order size</li>
            <li>Displayed during checkout</li>
            <li>Subject to change without notice</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            6. Returns and Refunds
          </h2>
          <p>
            Our return policy allows for returns within 30 days of delivery.
            Items must be:
          </p>
          <ul className='list-disc ml-6 mt-2'>
            <li>In original condition</li>
            <li>In original packaging</li>
            <li>Accompanied by proof of purchase</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            7. Intellectual Property
          </h2>
          <p>
            All content on this website, including text, graphics, logos, and
            software, is the property of Your Store Name and is protected by
            intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            8. Limitation of Liability
          </h2>
          <p>
            We are not liable for any indirect, incidental, or consequential
            damages arising from your use of our services.
          </p>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            9. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will
            be effective immediately upon posting to the website.
          </p>
          <p className='mt-2'>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            10. Contact Information
          </h2>
          <p>
            For questions about these Terms and Conditions, please contact us
            at:
          </p>
          <p className='mt-2'>Email: terms@yourstore.com</p>
        </section>
      </div>
    </div>
  );
}
