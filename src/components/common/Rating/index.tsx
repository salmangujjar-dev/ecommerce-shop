'use client';

import { useCallback, useMemo, useState } from 'react';

import { StarIcon } from 'lucide-react';

import { cn } from '@utils/cn';

import RatingModal from './modal';

type RatingProps = {
  rating: number;
  isModalInteractive?: boolean;
  isCssInteractive?: boolean;

  handleClick?: (rate: number) => void;
};

const Rating = ({
  rating,
  isModalInteractive = false,
  isCssInteractive = false,
  handleClick,
}: RatingProps) => {
  const [rate, setRating] = useState(0);

  const handleRating = useCallback(
    (rate: number) => {
      if (!isCssInteractive) return;

      if (handleClick) {
        handleClick(rate);
        return;
      }
      setRating(rate);
    },
    [isCssInteractive, handleClick]
  );

  const content = useMemo(
    () => (
      <div className='ml-1 group flex items-center flex-row-reverse justify-end'>
        {[5, 4, 3, 2, 1].map((rate) => (
          <StarIcon
            key={rate}
            aria-hidden='true'
            onClick={() => handleRating(rate)}
            className={cn(
              (Math.round(rating) ?? 0) >= rate
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-200 ',
              'size-5 shrink-0',
              isCssInteractive &&
                'peer-hover:scale-110 hover:scale-110 group-hover:text-gray-200 group-hover:fill-white hover:fill-yellow-400 hover:text-yellow-400 cursor-pointer peer peer-hover:fill-yellow-400 peer-hover:text-yellow-400'
            )}
          />
        ))}
      </div>
    ),
    [rating, handleRating, isCssInteractive]
  );

  return isModalInteractive ? (
    <RatingModal rate={rate}>{content}</RatingModal>
  ) : (
    content
  );
};

export default Rating;
