import { ChevronDownIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

// type CheckoutFormProps = {};

const paymentMethods = [
  { id: 'card', title: 'Credit Card/Debit Card' },
  { id: 'cod', title: 'Cash on Delivery' },
];

const CheckoutForm = () => {
  const { register } = useFormContext();

  return (
    <div>
      <div>
        <h2 className='text-lg font-medium text-gray-900'>
          Contact information
        </h2>

        <div className='mt-4'>
          <label
            htmlFor='email-address'
            className='block text-sm/6 font-medium text-gray-700'
          >
            Email address
          </label>
          <div className='mt-2'>
            <input
              id='email'
              type='email'
              autoComplete='email'
              className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              {...register('email')}
            />
          </div>
        </div>
      </div>

      <div className='mt-10 border-t border-gray-200 pt-10'>
        <h2 className='text-lg font-medium text-gray-900'>
          Shipping information
        </h2>

        <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
          <div>
            <label
              htmlFor='first-name'
              className='block text-sm/6 font-medium text-gray-700'
            >
              First name
            </label>
            <div className='mt-2'>
              <input
                id='first-name'
                name='first-name'
                type='text'
                autoComplete='given-name'
                className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='last-name'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Last name
            </label>
            <div className='mt-2'>
              <input
                id='last-name'
                name='last-name'
                type='text'
                autoComplete='family-name'
                className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
            </div>
          </div>

          <div className='sm:col-span-2'>
            <label
              htmlFor='address'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Address
            </label>
            <div className='mt-2'>
              <input
                id='address'
                name='address'
                type='text'
                autoComplete='street-address'
                className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
            </div>
          </div>

          <div className='sm:col-span-2'>
            <label
              htmlFor='apartment'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Apartment, suite, etc.
            </label>
            <div className='mt-2'>
              <input
                id='apartment'
                name='apartment'
                type='text'
                className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='city'
              className='block text-sm/6 font-medium text-gray-700'
            >
              City
            </label>
            <div className='mt-2'>
              <input
                id='city'
                name='city'
                type='text'
                autoComplete='address-level2'
                className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='country'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Country
            </label>
            <div className='mt-2 grid grid-cols-1'>
              <select
                id='country'
                name='country'
                autoComplete='country-name'
                className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
              <ChevronDownIcon
                aria-hidden='true'
                className='pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='region'
              className='block text-sm/6 font-medium text-gray-700'
            >
              State / Province
            </label>
            <div className='mt-2'>
              <input
                id='region'
                name='region'
                type='text'
                autoComplete='address-level1'
                className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='postal-code'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Postal code
            </label>
            <div className='mt-2'>
              <input
                id='postal-code'
                name='postal-code'
                type='text'
                autoComplete='postal-code'
                className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
            </div>
          </div>

          <div className='sm:col-span-2'>
            <label
              htmlFor='phone'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Phone
            </label>
            <div className='mt-2'>
              <input
                id='phone'
                name='phone'
                type='text'
                autoComplete='tel'
                className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className='mt-10 border-t border-gray-200 pt-10'>
        <h2 className='text-lg font-medium text-gray-900'>Payment</h2>

        <fieldset className='mt-4'>
          <legend className='sr-only'>Payment type</legend>
          <div className='space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10'>
            {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
              <div key={paymentMethod.id} className='flex items-center'>
                <input
                  defaultChecked={paymentMethodIdx === 0}
                  id={paymentMethod.id}
                  name='payment-type'
                  type='radio'
                  className='relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden'
                />
                <label
                  htmlFor={paymentMethod.id}
                  className='ml-3 block text-sm/6 font-medium text-gray-700'
                >
                  {paymentMethod.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <div className='mt-6 grid grid-cols-4 gap-x-4 gap-y-6'>
          <div className='col-span-4'>
            <label
              htmlFor='card-number'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Card number
            </label>
            <div className='mt-2'>
              <input
                id='card-number'
                name='card-number'
                type='text'
                autoComplete='cc-number'
                className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
            </div>
          </div>

          <div className='col-span-4'>
            <label
              htmlFor='name-on-card'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Name on card
            </label>
            <div className='mt-2'>
              <input
                id='name-on-card'
                name='name-on-card'
                type='text'
                autoComplete='cc-name'
                className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
            </div>
          </div>

          <div className='col-span-3'>
            <label
              htmlFor='expiration-date'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Expiration date (MM/YY)
            </label>
            <div className='mt-2'>
              <input
                id='expiration-date'
                name='expiration-date'
                type='text'
                autoComplete='cc-exp'
                className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='cvc'
              className='block text-sm/6 font-medium text-gray-700'
            >
              CVC
            </label>
            <div className='mt-2'>
              <input
                id='cvc'
                name='cvc'
                type='text'
                autoComplete='csc'
                className='block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
