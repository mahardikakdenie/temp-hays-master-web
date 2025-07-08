import { useCallback, useState } from 'react';
import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { Routes } from '@/libs/constants/routes.const';
import { bannerList } from '@/types/banner.types';

const useBanner = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: '',
  });

  const onChangeStartDate = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, startDate: value }));
  }, []);

  const onChangeEndDate = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, endDate: value }));
  }, []);

  const onChangeStatus = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, status: value }));
  }, []);

  const fetchBanner = usePaginatedFetch<bannerList>({
    key: 'banners',
    endpoint: Routes.BANNER_LIST,
    extraQuery: filters,
  });

  return {
    ...fetchBanner,
    ...filters,
    onChangeStartDate,
    onChangeEndDate,
    onChangeStatus,
  };
};

export default useBanner;
