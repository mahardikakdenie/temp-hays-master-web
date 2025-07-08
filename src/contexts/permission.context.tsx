'use client';

import type React from 'react';
import { useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { createSafeContext } from '@/libs/utils/createSafeContext';

export type PermissionProps = {
  [path: string]: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
};

const [PermissionContext, usePermissionCtx] = createSafeContext<PermissionProps>('Permission');

const PermissionProvider: React.FC<{
  value: PermissionProps;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
};

const usePermission = () => {
  const permissions = usePermissionCtx();
  const pathname = usePathname();

  const currentPermission = useMemo(() => permissions[pathname], [permissions, pathname]);

  const hasPermission = useCallback(
    (action: keyof PermissionProps[string]) => currentPermission?.[action] ?? false,
    [currentPermission],
  );

  const hasAllowed = useMemo(() => !!currentPermission, [currentPermission]);

  return {
    allPermissions: permissions,
    currentPermission,
    hasAllowed,
    hasPermission,
  };
};

export { usePermission, PermissionProvider };
