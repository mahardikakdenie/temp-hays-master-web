import type React from 'react';
import Link from 'next/link';
import { cn } from '@/libs/utils/cn.utils'; // asumsi kamu pakai cn helper

type DropdownItemProps = {
  tag?: 'a' | 'button';
  href?: string;
  baseClassName?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  onItemClick?: () => void;
};

const DropdownItem: React.FC<DropdownItemProps> = ({
  tag = 'button',
  href = '#',
  onClick,
  onItemClick,
  baseClassName = 'block w-full text-left px-3 py-2.5 text-sm rounded-lg hover:text-primary',
  className,
  children,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (tag === 'button') e.preventDefault();
    onClick?.();
    onItemClick?.();
  };

  const classes = cn(baseClassName, className);

  // HREF
  if (tag === 'a' && href) {
    return (
      <Link href={href} className={classes} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  // BUTTON
  return (
    <button type="button" onClick={handleClick} className={classes}>
      {children}
    </button>
  );
};

export default DropdownItem;
