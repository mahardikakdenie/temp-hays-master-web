import { useCallback, useState } from 'react';
import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { Routes } from '@/libs/constants/routes.const';
import { bannerList } from '@/types/banner.types';

const useArticle = () => {
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

  const fetchArticle = usePaginatedFetch<bannerList>({
    key: 'articles',
    endpoint: Routes.ARTICLE_LIST,
    extraQuery: filters,
  });

  return {
    ...fetchArticle,
    ...filters,
    onChangeStartDate,
    onChangeEndDate,
    onChangeStatus,
  };
};

export default useArticle;
