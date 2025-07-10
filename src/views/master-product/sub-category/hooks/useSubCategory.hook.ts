import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { Routes } from '@/libs/constants/routes.const';
import { Meta } from '@/types/commons.types';
import { SubCategoryList } from '@/types/sub-category.types';
import { useCallback, useState } from 'react';

const useSubCategory = () => {
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

  const fetchSubCategory = usePaginatedFetch<SubCategoryList>({
    key: 'subcategories',
    endpoint: Routes.SUB_CATEGORY_LIST,
    extraQuery: filters,
  });
  return {
    ...fetchSubCategory,
    filters,
    onMeta,
    onChangeStartDate,
    onChangeEndDate,
    onChangeStatus,
    meta: fetchSubCategory.meta || meta,
    onSearch: fetchSubCategory.onSearch,
  };
};

export default useSubCategory;
