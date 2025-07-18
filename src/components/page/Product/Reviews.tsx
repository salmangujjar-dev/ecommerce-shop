import Image from 'next/image';

import { StarIcon } from 'lucide-react';

import RatingModal from '@common/Rating/modal';

import { cn } from '@utils/cn';

const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    {
      id: 2,
      rating: 5,
      content: `
          <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
        `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
  ],
};

const Reviews = () => {
  return (
    <div className='bg-white' id='reviews'>
      <div className='mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-24'>
        <div className='lg:col-span-4'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
            Customer Reviews
          </h2>

          <div className='mt-3 flex items-center'>
            <div>
              <div className='flex items-center' dir='rtl'>
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden='true'
                    className={cn(
                      (reviews.average ?? 0) > rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-200 hover:fill-yellow-400 hover:text-yellow-400',
                      'size-5 shrink-0 cursor-pointer peer peer-hover:fill-yellow-500 peer-hover:text-yellow-400'
                    )}
                  />
                ))}
              </div>
              <p className='sr-only'>{reviews.average} out of 5 stars</p>
            </div>
            <p className='ml-2 text-sm text-gray-900'>
              Based on {reviews.totalCount} reviews
            </p>
          </div>

          <div className='mt-6'>
            <h3 className='sr-only'>Review data</h3>

            <dl className='space-y-3'>
              {reviews.counts.map((count) => (
                <div key={count.rating} className='flex items-center text-sm'>
                  <dt className='flex flex-1 items-center'>
                    <p className='w-3 font-medium text-gray-900'>
                      {count.rating}
                      <span className='sr-only'> star reviews</span>
                    </p>
                    <div
                      aria-hidden='true'
                      className='ml-1 flex flex-1 items-center'
                    >
                      <StarIcon
                        aria-hidden='true'
                        className={cn(
                          count.count > 0
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300',
                          'size-5 shrink-0'
                        )}
                      />

                      <div className='relative ml-3 flex-1'>
                        <div className='h-3 rounded-full border border-gray-200 bg-gray-100' />
                        {count.count > 0 ? (
                          <div
                            style={{
                              width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
                            }}
                            className='absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400'
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className='ml-3 w-10 text-right text-sm text-gray-900 tabular-nums'>
                    {Math.round((count.count / reviews.totalCount) * 100)}%
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className='mt-10'>
            <h3 className='text-lg font-medium text-gray-900'>
              Share your thoughts
            </h3>
            <p className='mt-1 text-sm text-gray-600'>
              If you’ve used this product, share your thoughts with other
              customers
            </p>

            <RatingModal rate={5}>
              <span className='mt-6 cursor-pointer inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full'>
                Write a review
              </span>
            </RatingModal>
          </div>
        </div>

        <div className='mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0'>
          <h3 className='sr-only'>Recent reviews</h3>

          <div className='flow-root'>
            <div className='-my-12 divide-y divide-gray-200'>
              {reviews.featured.map((review) => (
                <div key={review.id} className='py-12'>
                  <div className='flex items-center'>
                    <Image
                      width={0}
                      height={0}
                      sizes='100vw'
                      alt={`${review.author}.`}
                      src={review.avatarSrc}
                      className='size-12 rounded-full'
                    />
                    <div className='ml-4'>
                      <h4 className='text-sm font-bold text-gray-900'>
                        {review.author}
                      </h4>
                      <div className='mt-1 flex items-center' dir='rtl'>
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            aria-hidden='true'
                            className={cn(
                              review.rating > rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-200 hover:fill-yellow-400 hover:text-yellow-400',
                              'size-5 shrink-0 cursor-pointer peer peer-hover:fill-yellow-500 peer-hover:text-yellow-400'
                            )}
                          />
                        ))}
                      </div>
                      <p className='sr-only'>{review.rating} out of 5 stars</p>
                    </div>
                  </div>

                  <div
                    dangerouslySetInnerHTML={{ __html: review.content }}
                    className='mt-4 space-y-6 text-base text-gray-600 italic'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
