import React, { forwardRef } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@utils/cn';

import { TailwindGenericColorClassNameType } from '@globals/types';

const spinnerVariants = (
  color: TailwindGenericColorClassNameType<'border'>
) => {
  return cva(
    cn(`box-border rounded-full ${color} border-b-transparent animate-spin`),
    {
      variants: {
        size: {
          default: 'w-12 h-12 border-4',
          sm: 'w-5 h-5 border-2',
        },
      },
      defaultVariants: {
        size: 'default',
      },
    }
  );
};

type SpinnerProps = VariantProps<ReturnType<typeof spinnerVariants>> & {
  color?: TailwindGenericColorClassNameType<'border'>;
  className?: string;
};

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, color = 'border-blue-500' }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spinnerVariants(color)({ size }), className)}
      />
    );
  }
);

Spinner.displayName = 'Spinner';

export default Spinner;
