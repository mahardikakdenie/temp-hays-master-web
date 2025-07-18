'use client';

import type React from 'react';
import type { Menu, User } from '@/types/commons.types';
import { useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/contexts/sidebar.context';
import { useNetwork } from '@/contexts/network.context';
import { usePermission } from '@/contexts/permission.context';
import { cn } from '@/libs/utils/cn.utils';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import AppBackdrop from './AppBackdrop';
import Notification from '../ui/notification/Notification';
import { useQuery } from '@tanstack/react-query';
import { useInternal } from '@/hooks/useInternal';
import { Routes } from '@/libs/constants/routes.const';
import { HttpStatus } from '@/libs/constants/httpStatus.const';

type AppAdminLayoutProps = {
  menus: Menu[];
  user: User;
  children: React.ReactNode;
};

const AppAdminLayout: React.FC<AppAdminLayoutProps> = ({ menus, user, children }) => {
  const { isOnline, connectionRef } = useNetwork();
  const { isExpanded, isMobileOpen } = useSidebar();
  const { hasAllowed, setPermission } = usePermission();
  const internalApi = useInternal();
  const pathname = usePathname();

  const {
    data: permission,
    isLoading: isPermissionLoading,
    isFetching: isPermissionFetching,
    // refetch,
  } = useQuery({
    queryKey: ['permission', pathname],
    queryFn: async () => {
      const res = await internalApi(Routes.AUTH_PERMISSION, {
        path: pathname,
      });

      if (res.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch banner detail');
      }
      const { data } = await res.json();
      return data;
    },
    enabled: !!pathname,
  });

  // useEffect(() => {
  //   if (pathname) {
  //     refetch();
  //   }
  // }, [pathname, refetch]);

  useEffect(() => {
    if (!isPermissionLoading && !isPermissionFetching && permission) {
      setPermission(permission);
    }
  }, [isPermissionLoading, isPermissionFetching, permission, setPermission]);

  const mainContentMargin = useMemo(() => {
    if (isMobileOpen) return 'ml-0';
    return isExpanded ? 'lg:ml-[240px]' : 'lg:ml-[90px]';
  }, [isExpanded, isMobileOpen]);

  // useEffect(() => {
  //   if (!hasAllowed && !isPermissionLoading && !isPermissionFetching) {
  //     // router.replace('/forbidden');
  //   }
  // }, [hasAllowed, isPermissionLoading, isPermissionFetching, router]);

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
          {isPermissionLoading || isPermissionFetching ? (
            <div className="flex flex-col items-center justify-center gap-4 py-10 px-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-200">Loading Page</h3>
                <p className="text-sm md:text-base text-gray-400 mt-1">
                  Please wait while we prepare the content for you...
                </p>
              </div>
            </div>
          ) : hasAllowed ? (
            children
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-xl">Forbidden</p>
              <p>You don&apos;t have permission to access this page.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppAdminLayout;
