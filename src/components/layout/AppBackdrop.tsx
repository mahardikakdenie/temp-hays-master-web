import type React from 'react';
import { useSidebar } from '@/contexts/sidebar.context';

const AppBackdrop: React.FC = () => {
  const { isMobileOpen, onToggleMobileSidebar } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-ui-900/50 backdrop-blur-sm lg:hidden z-40"
      onClick={onToggleMobileSidebar}
    />
  );
};

export default AppBackdrop;
