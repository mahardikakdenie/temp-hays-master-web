import type React from 'react';
import { cn } from '@/libs/utils/cn.utils';

type BadgeProps = {
  variant?: 'light' | 'solid';
  size?: 'sm' | 'md';
  color?: 'primary' | 'success' | 'error' | 'warning' | 'info';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
};

const BADGE_STYLES = {
  sm: 'text-xs',
  md: 'text-sm',
};

const BADGE_VARIANTS = {
  light: {
    primary: 'bg-blue-500/15 text-blue-300',
    success: 'bg-green-500/15 text-green-500',
    error: 'bg-red-500/15 text-red-500',
    warning: 'bg-amber-500/15 text-amber-500',
    info: 'bg-sky-500/15 text-sky-500',
  },
  solid: {
    primary: 'bg-blue-500 text-white/90',
    success: 'bg-green-500 text-white/90',
    error: 'bg-red-500 text-white/90',
    warning: 'bg-amber-500 text-white/90',
    info: 'bg-sky-500 text-white/90',
  },
};

const Badge: React.FC<BadgeProps> = ({
  variant = 'light',
  color = 'primary',
  size = 'md',
  startIcon,
  endIcon,
  children,
}) => {
  const sizeClasses = BADGE_STYLES[size];
  const colorClasses = BADGE_VARIANTS[variant][color];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 justify-center gap-1 rounded-full font-medium',
        sizeClasses,
        colorClasses,
      )}
    >
      {/* START ICON */}
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {/* CHILDREN */}
      {children}
      {/* END ICON */}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </span>
  );
};

export default Badge;
