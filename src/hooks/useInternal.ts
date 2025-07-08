import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { cleanQuery } from '@/libs/utils/cleanQuery';
import { internalAPI } from '@/libs/interceptors/api-int.interceptor';

export const useInternal = () => {
  const router = useRouter();

  return useCallback(
    (url: string, params = {}, options: RequestInit = {}) => {
      const query = cleanQuery(params);
      const searchParams = new URLSearchParams(query).toString();
      const target = searchParams ? `${url}?${searchParams}` : url;

      return internalAPI(target, {
        ...options,
        onUnauthorized: () => router.replace('/login'),
        onForbidden: () => router.replace('/forbidden'),
      });
    },
    [router],
  );
};
