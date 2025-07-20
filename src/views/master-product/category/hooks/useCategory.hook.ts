import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { Routes } from '@/libs/constants/routes.const';
import { CategoryList } from '@/types/category.types';
import { useCallback, useState } from 'react';

const useCategory = () => {
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

  const onMeta = useCallback((meta: Partial<{ page: number }>) => {
    setFilters((prev) => ({ ...prev, ...meta }));
  }, []);

  const fetchCategories = usePaginatedFetch<CategoryList>({
    key: 'categories',
    endpoint: Routes.CATEGORY_LIST,
    extraQuery: filters,
  });
  return {
    ...fetchCategories,
    filters,
    onMeta,
    onChangeStartDate,
    onChangeEndDate,
    onChangeStatus,
    meta: fetchCategories.meta,
    sort: fetchCategories.sort,
  };
};

export default useCategory;
