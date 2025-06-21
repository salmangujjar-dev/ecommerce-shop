'use client';

import {
  cloneElement,
  isValidElement,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Button } from '@ui/button';
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@ui/dialog';
import { Textarea } from '@ui/textarea';

import Rating from '.';

type RatingModalProps = {
  children: ReactElement<{ onClick?: () => void }>;
  rate: number;
};

const RatingModal = ({ children, rate }: RatingModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [_rate, _setRating] = useState(rate);

  const handleClose = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    _setRating(rate);
  }, [rate]);

  return (
    <>
      {isValidElement(children) &&
        cloneElement(children, { onClick: () => setIsOpen(true) })}
      {isOpen && (
        <Dialog open={isOpen} onClose={handleClose}>
          <DialogTitle>Review</DialogTitle>
          <DialogBody>
            <div className='flex items-center'>
              <Rating
                rating={_rate}
                isCssInteractive
                handleClick={(rate) => _setRating(rate)}
              />{' '}
              <div aria-hidden='true' className='mx-2 text-sm text-gray-300'>
                ·
              </div>{' '}
              <span className='text-sm text-gray-700'>{_rate}</span>
            </div>
            <div className='flex flex-col gap-y-1 mt-5'>
              <label htmlFor='comment' className='text-sm/6 '>
                Comment:
              </label>
              <Textarea
                id='comment'
                rows={5}
                resizable={false}
                placeholder='Enter your review comment here...'
              />
            </div>
          </DialogBody>
          <DialogActions>
            <Button onClick={handleClose}>Confirm</Button>
            <Button plain onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default RatingModal;
