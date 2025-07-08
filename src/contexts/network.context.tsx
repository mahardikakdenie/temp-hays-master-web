'use client';

import type React from 'react';
import type { Nullable } from '@/types/commons.types';
import { useEffect, useRef, useState } from 'react';
import { createSafeContext } from '@/libs/utils/createSafeContext';

type NetworkContextProps = Nullable<{
  isOnline: boolean;
  connectionRef: React.RefObject<boolean | null>;
}>;

const [NetworkContext, useNetwork] = createSafeContext<NetworkContextProps>('Network');

const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const connectionRef = useRef<boolean | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <NetworkContext.Provider
      value={{
        isOnline,
        connectionRef,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export { useNetwork, NetworkProvider };
