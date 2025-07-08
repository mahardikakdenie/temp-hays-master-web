import type React from 'react';
import { useEffect, useRef } from 'react';
import { cn } from '@/libs/utils/cn.utils';

type DropdownProps = {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
};

const Dropdown: React.FC<DropdownProps> = ({ isOpen, onClose, children, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.dropdown-toggle')
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={cn('absolute -right-5 lg:-right-6 rounded-bl-lg bg-ui-900 z-40', className)}
    >
      {/* CHILDREN */}
      {children}
    </div>
  );
};

export default Dropdown;
