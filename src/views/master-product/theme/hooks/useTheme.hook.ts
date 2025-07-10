import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { Routes } from '@/libs/constants/routes.const';
import { Meta } from '@/types/commons.types';
import { Theme } from '@/types/theme.types';
import { useCallback, useState } from 'react';

const useThemeHook = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: '',
  });

  const [meta, setMeta] = useState<Meta>({
    page: 1,
    limit: 10,
    totalData: 0,
    totalPage: 0,
  });

  const onMeta = (meta: Partial<{ page: number }>) => {
    setMeta((prev) => ({ ...prev, ...meta }));
  };

  const onChangeStartDate = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, startDate: value }));
  }, []);

  const onChangeEndDate = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, endDate: value }));
  }, []);

  const onChangeStatus = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, status: value }));
  }, []);

  const fetchTheme = usePaginatedFetch<Theme>({
    key: 'theme',
    endpoint: Routes.THEME_LIST,
    extraQuery: filters,
  });

  return {
    ...fetchTheme,
    filters,
    meta,
    onChangeEndDate,
    onChangeStartDate,
    onChangeStatus,
    onMeta,
  };
};

export default useThemeHook;
