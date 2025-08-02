import { useGlobal } from '@/contexts/global.context';
import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { App } from '@/libs/constants/app.const';
import { Routes } from '@/libs/constants/routes.const';
import { Filter, Meta } from '@/types/commons.types';
import { EXHIBITION } from '@/types/exhibition.types';
import debounce from 'lodash.debounce';
import { useCallback, useMemo, useState } from 'react';

const useExhibitionHook = () => {
  const { onCloseModal, onOpenModal } = useGlobal();
  const [appliedFilter, setAppliedFilter] = useState<Filter>(App.INITIAL_FILTER);
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
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

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

  const fetchExhibition = usePaginatedFetch<EXHIBITION>({
    key: 'exhibition',
    endpoint: Routes.EXHIBITION_LIST,
    extraQuery: appliedFilter,
  });

  const debouncedSetSearch = useMemo(
    () =>
      debounce((val: string) => {
        setDebouncedSearch(val);
        setMeta((prev) => ({ ...prev, page: 1 }));
      }, 400),
    [],
  );

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      debouncedSetSearch(e.target.value);
    },
    [debouncedSetSearch],
  );

  const onSubmitFilter = useCallback(() => {
    setAppliedFilter(filters);
    onCloseModal();
  }, [filters, onCloseModal]);

  const onResetFilter = useCallback(() => {
    setFilters(App.INITIAL_FILTER);
    setAppliedFilter(App.INITIAL_FILTER);
  }, []);

  return {
    ...fetchExhibition,
    search: fetchExhibition.search || search,
    onSearch: fetchExhibition.onSearch || onSearch,
    onMeta: fetchExhibition.onMeta || onMeta,
    meta: fetchExhibition.meta || meta,
    onChangeEndDate,
    onChangeStartDate,
    onChangeStatus,
    debouncedSearch,
    filters,
    onCloseModal,
    onOpenModal,
    onSubmitFilter,
    onResetFilter,
  };
};

export default useExhibitionHook;
