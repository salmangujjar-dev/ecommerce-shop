import Image from 'next/image';

import { cn } from '@utils/cn';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  isDark?: boolean;
}

const Logo = ({ size = 'md', className, isDark = false }: LogoProps) => {
  const sizeClasses = {
    xs: 'w-16',
    sm: 'w-24',
    md: 'w-32',
    lg: 'w-48',
  };

  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src={isDark ? '/logo-dark.png' : '/logo.png'}
        alt='BuildAStore'
        width={200}
        height={200}
        className={cn(sizeClasses[size], 'h-auto object-contain')}
        priority
      />
    </div>
  );
};

export default Logo;
