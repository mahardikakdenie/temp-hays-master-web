'use client';

import type React from 'react';
import type { Nullable } from '@/types/commons.types';
import { useState, useEffect, useCallback } from 'react';
import { createSafeContext } from '@/libs/utils/createSafeContext';

type SidebarContextProps = Nullable<{
  isExpanded: boolean;
  isMobile: boolean;
  isMobileOpen: boolean;
  activeItem: string | null;
  openSubmenu: string | null;
  onToggleSidebar: () => void;
  onToggleMobileSidebar: () => void;
  onToggleSubmenu: (item: string) => void;
  setActiveItem: (item: string | null) => void;
}>;

const [SidebarContext, useSidebar] = createSafeContext<SidebarContextProps>('Sidebar');

const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onToggleSidebar = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const onToggleMobileSidebar = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const onToggleSubmenu = useCallback((item: string) => {
    setOpenSubmenu((prev) => (prev === item ? null : item));
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isExpanded: isMobile ? false : isExpanded,
        isMobile,
        isMobileOpen,
        activeItem,
        openSubmenu,
        onToggleSidebar,
        onToggleMobileSidebar,
        onToggleSubmenu,
        setActiveItem,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export { useSidebar, SidebarProvider };
