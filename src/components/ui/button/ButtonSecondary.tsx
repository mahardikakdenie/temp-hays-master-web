import type React from 'react';
import type { ButtonProps } from './types';
import { Button as HeadlessButton } from '@headlessui/react';
import { cn } from '@/libs/utils/cn.utils';
import LoadingIcon from '@/components/icons/Loading';

const ButtonSecondary: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  isLoading = false,
  icon,
  disabled,
  ...restProps
}) => {
  const baseClasses = cn(`text-white/90 border border-secondary/[16%] w-full`, className);

  const isDisabled = disabled || isLoading;

  return (
    <HeadlessButton
      type={type}
      disabled={isDisabled}
      className={`flex items-center justify-center gap-2 text-sm font-semibold py-2.75 px-3.75 rounded-lg ${baseClasses}`}
      {...restProps}
    >
      {isLoading ? (
        <LoadingIcon className="w-5 h-5 text-white/90" />
      ) : (
        <>
          {/* ICON */}
          {icon && <span>{icon}</span>}
          {/* CHILDREN */}
          {children}
        </>
      )}
    </HeadlessButton>
  );
};

export default ButtonSecondary;
