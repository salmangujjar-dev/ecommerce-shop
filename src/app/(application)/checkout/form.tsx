import { useEffect, useState } from 'react';

import { ChevronDownIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import z from 'zod';

import { Input } from '@ui/input';
import { Link } from '@ui/link';
import { Radio, RadioField, RadioGroup } from '@ui/radio';

import { fetchCountries, type Country } from '../../../lib/api/location';

import { checkoutSchema } from './validation';

const paymentMethods = [
  { id: 'card', title: 'Credit Card/Debit Card' },
  { id: 'cod', title: 'Cash on Delivery' },
];

const CheckoutForm = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<z.infer<typeof checkoutSchema>>();
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
        setCountries([
          { name: 'Pakistan', code: 'PK' },
          { name: 'United States', code: 'US' },
        ]);
        console.error('Error loading countries:', err);
      } finally {
        setIsLoadingCountries(false);
      }
    };
    loadCountries();
  }, []);

  const paymentType = watch('paymentType');

  return (
    <div>
      <div>
        <h2 className='text-lg font-medium text-gray-900'>
          Contact information
        </h2>

        <div className='mt-4'>
          <label
            htmlFor='email'
            className='block text-sm/6 font-medium text-gray-700'
          >
            Email address <span className='text-red-500'>*</span>
          </label>
          <div className='mt-2'>
            <Input
              id='email'
              type='email'
              autoComplete='email'
              required
              {...register('email')}
            />
            {errors.email?.message && (
              <p className='text-red-500 text-sm'>{errors.email.message}</p>
            )}
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
              First name <span className='text-red-500'>*</span>
            </label>
            <div className='mt-2'>
              <Input
                id='firstName'
                type='text'
                required
                autoComplete='given-name'
                {...register('firstName')}
              />
              {errors.firstName?.message && (
                <p className='text-red-500 text-sm'>
                  {errors.firstName.message}
                </p>
              )}
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
              {errors.lastName?.message && (
                <p className='text-red-500 text-sm'>
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className='sm:col-span-2'>
            <label
              htmlFor='address'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Address <span className='text-red-500'>*</span>
            </label>
            <div className='mt-2'>
              <Input
                id='address'
                type='text'
                autoComplete='street-address'
                required
                {...register('address')}
              />
              {errors.address?.message && (
                <p className='text-red-500 text-sm'>{errors.address.message}</p>
              )}
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
              {errors.apartment?.message && (
                <p className='text-red-500 text-sm'>
                  {errors.apartment.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor='country'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Country <span className='text-red-500'>*</span>
            </label>
            <div className='mt-2 grid grid-cols-1'>
              <select
                id='country'
                autoComplete='country-name'
                className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                required
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
            {errors.country?.message && (
              <p className='text-red-500 text-sm'>{errors.country.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='city'
              className='block text-sm/6 font-medium text-gray-700'
            >
              City <span className='text-red-500'>*</span>
            </label>
            <div className='mt-2'>
              <Input
                id='city'
                type='text'
                autoComplete='address-level2'
                required
                {...register('city')}
              />
            </div>
            {errors.city?.message && (
              <p className='text-red-500 text-sm'>{errors.city.message}</p>
            )}
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
              State / Province <span className='text-red-500'>*</span>
            </label>
            <div className='mt-2'>
              <Input
                id='region'
                type='text'
                autoComplete='address-level1'
                required
                {...register('region')}
              />
              {errors.region?.message && (
                <p className='text-red-500 text-sm'>{errors.region.message}</p>
              )}
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
              {errors.postalCode?.message && (
                <p className='text-red-500 text-sm'>
                  {errors.postalCode.message}
                </p>
              )}
            </div>
          </div>

          <div className='sm:col-span-2'>
            <label
              htmlFor='phone'
              className='block text-sm/6 font-medium text-gray-700'
            >
              Phone <span className='text-red-500'>*</span>
            </label>
            <div className='mt-2'>
              <Input
                id='phone'
                type='text'
                autoComplete='tel'
                required
                {...register('phone')}
              />
              {errors.phone?.message && (
                <p className='text-red-500 text-sm'>{errors.phone.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className='mt-10 border-t border-gray-200 pt-10'>
        <h2 className='text-lg font-medium text-gray-900'>
          Payment <span className='text-red-500'>*</span>
        </h2>

        <fieldset aria-label='Payment Type' className='mt-4'>
          <RadioGroup
            className='flex items-center space-y-0 text-sm/6'
            {...register('paymentType')}
            value={paymentType}
            onChange={(e) => {
              setValue('paymentType', e as 'cod' | 'card');
            }}
          >
            {paymentMethods.map((paymentMethod) => (
              <RadioField key={paymentMethod.id} className='gap-x-2 flex-1'>
                <Radio value={paymentMethod.id} color='blue' />
                <span data-slot='label'>{paymentMethod.title}</span>
              </RadioField>
            ))}
          </RadioGroup>
        </fieldset>

        {paymentType === 'card' && (
          <div className='mt-6 grid grid-cols-4 gap-x-4 gap-y-6'>
            <div className='col-span-4'>
              <label
                htmlFor='cardNumber'
                className='block text-sm/6 font-medium text-gray-700'
              >
                Card number <span className='text-red-500'>*</span>
              </label>
              <div className='mt-2'>
                <Input
                  id='cardNumber'
                  type='text'
                  autoComplete='cc-number'
                  required
                  {...register('cardNumber')}
                />
                {errors.cardNumber?.message && (
                  <p className='text-red-500 text-sm'>
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div className='col-span-4'>
              <label
                htmlFor='nameOnCard'
                className='block text-sm/6 font-medium text-gray-700'
              >
                Name on card <span className='text-red-500'>*</span>
              </label>
              <div className='mt-2'>
                <Input
                  id='nameOnCard'
                  type='text'
                  autoComplete='cc-name'
                  required
                  {...register('nameOnCard')}
                />
                {errors.nameOnCard?.message && (
                  <p className='text-red-500 text-sm'>
                    {errors.nameOnCard.message}
                  </p>
                )}
              </div>
            </div>

            <div className='col-span-3'>
              <label
                htmlFor='expirationDate'
                className='block text-sm/6 font-medium text-gray-700'
              >
                Expiration date (MM/YY) <span className='text-red-500'>*</span>
              </label>
              <div className='mt-2'>
                <Input
                  id='expirationDate'
                  type='text'
                  autoComplete='cc-exp'
                  required
                  {...register('expirationDate')}
                />
                {errors.expirationDate?.message && (
                  <p className='text-red-500 text-sm'>
                    {errors.expirationDate.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor='cvc'
                className='block text-sm/6 font-medium text-gray-700'
              >
                CVC <span className='text-red-500'>*</span>
              </label>
              <div className='mt-2'>
                <Input
                  id='cvc'
                  type='text'
                  autoComplete='csc'
                  required
                  {...register('cvc')}
                />
                {errors.cvc?.message && (
                  <p className='text-red-500 text-sm'>{errors.cvc.message}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Terms and Privacy Links */}
      <div className='mt-8 text-sm text-gray-500'>
        <p>
          By placing your order, you agree to our{' '}
          <Link href='/terms' className='text-indigo-600 hover:text-indigo-500'>
            Terms and Conditions
          </Link>{' '}
          and{' '}
          <Link
            href='/privacy-policy'
            className='text-indigo-600 hover:text-indigo-500'
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default CheckoutForm;
