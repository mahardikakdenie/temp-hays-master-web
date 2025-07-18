'use client';

import type React from 'react';
import { createSafeContext } from '@/libs/utils/createSafeContext';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

export type PermissionData = {
  id: number;
  actions: {
    view: number;
    update: number;
    create: number;
    delete: number;
  };
  path: string;
};

export type PermissionCtxProps = {
  permission: PermissionData | undefined;
  allowedAction: string | null;
  hasAllowed: boolean;
  setPermission: React.Dispatch<React.SetStateAction<PermissionData | undefined>>;
  hasPermission: (action: keyof PermissionData['actions']) => boolean;
};

const [PermissionContext, usePermissionCtx] = createSafeContext<PermissionCtxProps>('Permission');

const PermissionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const pathname = usePathname();
  const [permission, setPermission] = useState<PermissionData | undefined>();

  const allowedAction = useMemo(() => {
    if (pathname.includes('create')) return 'create';
    if (pathname.includes('update')) return 'update';
    return 'view';
  }, [pathname]);

  const hasPermission = useCallback(
    (action: keyof PermissionData['actions']) => {
      return !!permission?.actions[action];
    },
    [permission],
  );

  const hasAllowed = useMemo(() => {
    if (!permission) return false;
    return hasPermission(allowedAction as keyof PermissionData['actions']);
  }, [permission, allowedAction, hasPermission]);

  useEffect(() => {
    console.log('see permission : ', permission);
  }, [permission]);

  return (
    <PermissionContext.Provider
      value={{
        permission,
        allowedAction,
        hasAllowed,
        setPermission,
        hasPermission,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

// Custom hook untuk pakai permission
const usePermission = () => {
  const context = usePermissionCtx();

  return {
    ...context,
    hasPermission: context.hasPermission,
    hasAllowed: context.hasAllowed,
    allowedAction: context.allowedAction,
  };
};

export { usePermission, PermissionProvider };
