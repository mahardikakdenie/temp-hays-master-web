import { useGlobal } from '@/contexts/global.context';
import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { App } from '@/libs/constants/app.const';
import { Routes } from '@/libs/constants/routes.const';
import { Category } from '@/types/category.types';
import { Filter } from '@/types/commons.types';
import { useCallback, useState } from 'react';

const useCategory = () => {
  const { onCloseModal, onOpenModal } = useGlobal();
  const [appliedFilter, setAppliedFilter] = useState<Filter>(App.INITIAL_FILTER);
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

  const fetchCategories = usePaginatedFetch<Category>({
    key: 'categories',
    endpoint: Routes.CATEGORY_LIST,
    extraQuery: appliedFilter,
  });

  const onSubmitFilter = useCallback(() => {
    setAppliedFilter(filters);
    onCloseModal();
  }, [filters, onCloseModal]);

  const onResetFilter = useCallback(() => {
    setFilters(App.INITIAL_FILTER);
    setAppliedFilter(App.INITIAL_FILTER);
  }, []);
  return {
    ...fetchCategories,
    filters,
    onMeta,
    onChangeStartDate,
    onChangeEndDate,
    onChangeStatus,
    meta: fetchCategories.meta,
    sort: fetchCategories.sort,
    onSubmitFilter,
    onResetFilter,
    onOpenModal,
  };
};

export default useCategory;
