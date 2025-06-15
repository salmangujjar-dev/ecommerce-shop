import { useEffect, useState } from 'react';

import { ChevronDownIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Input } from '@ui/input';

import { fetchCountries, type Country } from '../../../lib/api/location';

// type CheckoutFormProps = {};

const paymentMethods = [
  { id: 'card', title: 'Credit Card/Debit Card' },
  { id: 'cod', title: 'Cash on Delivery' },
];

const CheckoutForm = () => {
  const { register, setValue } = useFormContext();
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setIsLoadingCountries(true);
        setError(null);
        const countriesData = await fetchCountries();
        setCountries(countriesData);
      } catch (err) {
        setError('Failed to load countries. Please try again.');
        console.error('Error loading countries:', err);
      } finally {
        setIsLoadingCountries(false);
      }
    };
    loadCountries();
  }, []);

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
            <Input
              id='email'
              type='email'
              autoComplete='email'
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
              htmlFor='firstName'
              className='block text-sm/6 font-medium text-gray-700'
            >
              First name
            </label>
            <div className='mt-2'>
              <Input
                id='firstName'
                type='text'
                required
                autoComplete='given-name'
                {...register('firstName')}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='lastName'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Last name
            </label>
            <div className='mt-2'>
              <Input
                id='lastName'
                type='text'
                autoComplete='family-name'
                {...register('lastName')}
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
              <Input
                id='address'
                type='text'
                autoComplete='street-address'
                {...register('address')}
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
              <Input id='apartment' type='text' {...register('apartment')} />
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
                autoComplete='country-name'
                className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                {...register('country')}
                onChange={(e) => {
                  setValue('country', e.target.value);
                }}
                disabled={isLoadingCountries}
              >
                <option value=''>Select a country</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              <ChevronDownIcon
                aria-hidden='true'
                className='pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4'
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
              <Input
                id='city'
                type='text'
                autoComplete='address-level2'
                {...register('city')}
              />
            </div>
          </div>

          {error && (
            <div className='col-span-2 mt-2'>
              <p className='text-sm text-red-600'>{error}</p>
            </div>
          )}

          <div>
            <label
              htmlFor='region'
              className='block text-sm/6 font-medium text-gray-700'
            >
              State / Province
            </label>
            <div className='mt-2'>
              <Input
                id='region'
                type='text'
                autoComplete='address-level1'
                {...register('region')}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='postalCode'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Postal code
            </label>
            <div className='mt-2'>
              <Input
                id='postalCode'
                type='text'
                autoComplete='postal-code'
                {...register('postalCode')}
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
              <Input
                id='phone'
                type='text'
                autoComplete='tel'
                {...register('phone')}
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
                  type='radio'
                  className='relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden'
                  {...register('paymentType')}
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
              htmlFor='cardNumber'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Card number
            </label>
            <div className='mt-2'>
              <Input
                id='cardNumber'
                type='text'
                autoComplete='cc-number'
                {...register('cardNumber')}
              />
            </div>
          </div>

          <div className='col-span-4'>
            <label
              htmlFor='nameOnCard'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Name on card
            </label>
            <div className='mt-2'>
              <Input
                id='nameOnCard'
                type='text'
                autoComplete='cc-name'
                {...register('nameOnCard')}
              />
            </div>
          </div>

          <div className='col-span-3'>
            <label
              htmlFor='expirationDate'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Expiration date (MM/YY)
            </label>
            <div className='mt-2'>
              <Input
                id='expirationDate'
                type='text'
                autoComplete='cc-exp'
                {...register('expirationDate')}
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
              <Input
                id='cvc'
                type='text'
                autoComplete='csc'
                {...register('cvc')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
