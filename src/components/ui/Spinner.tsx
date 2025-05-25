import React, { forwardRef } from 'react';

import { cn } from '@utils/cn';

type SpinnerProps = {
  className?: string;
};

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-12 h-12 border-4 box-border rounded-full border-blue-500 border-b-transparent animate-spin',
          className
        )}
      />
    );
  }
);

Spinner.displayName = 'Spinner';

export default Spinner;
