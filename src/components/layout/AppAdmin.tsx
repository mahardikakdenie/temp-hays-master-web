'use client';

import type React from 'react';
import type { Menu, User } from '@/types/commons.types';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSidebar } from '@/contexts/sidebar.context';
import { useNetwork } from '@/contexts/network.context';
import { usePermission } from '@/contexts/permission.context';
import { cn } from '@/libs/utils/cn.utils';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import AppBackdrop from './AppBackdrop';
import Notification from '../ui/notification/Notification';
import LoadingIcon from '../icons/Loading';

type AppAdminLayoutProps = {
  menus: Menu[];
  user: User;
  children: React.ReactNode;
};

const AppAdminLayout: React.FC<AppAdminLayoutProps> = ({ menus, user, children }) => {
  const { isOnline, connectionRef } = useNetwork();
  const { isExpanded, isMobileOpen } = useSidebar();
  const { hasAllowed } = usePermission();

  const router = useRouter();

  const mainContentMargin = useMemo(() => {
    if (isMobileOpen) return 'ml-0';
    return isExpanded ? 'lg:ml-[240px]' : 'lg:ml-[90px]';
  }, [isExpanded, isMobileOpen]);

  useEffect(() => {
    if (!hasAllowed) {
      router.replace('/forbidden');
    }
  }, [hasAllowed, router]);

  useEffect(() => {
    const wasOnline = connectionRef.current;

    if (wasOnline !== null && wasOnline !== isOnline) {
      Notification({
        message: isOnline ? 'Connected to internet' : 'You are offline',
        description: isOnline
          ? 'Your network connection has been restored.'
          : 'Please check your connection and try again.',
        type: isOnline ? 'success' : 'error',
      });
    }

    connectionRef.current = isOnline;
  }, [isOnline, connectionRef]);

  return (
    <div className="min-h-screen xl:flex">
      {/* SIDEBAR & BACKDROP */}
      <AppSidebar menus={menus} />
      <AppBackdrop />
      {/* MAIN CONTENT */}
      <div className={cn('flex-1 transition-[margin] duration-300 ease-in-out', mainContentMargin)}>
        {/* HEADER */}
        <AppHeader user={user} />
        {/* PAGE CONTENT */}
        <div className="p-4 md:p-6 mx-auto max-w-(--breakpoint-2xl)">
          {hasAllowed ? (
            children
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <LoadingIcon className="w-6 h-6" />
              <p className="text-xl">Checking Permission...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppAdminLayout;
