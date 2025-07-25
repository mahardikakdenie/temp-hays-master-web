import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { Routes } from '@/libs/constants/routes.const';
import { Meta } from '@/types/commons.types';
import { EXHIBITION } from '@/types/exhibition.types';
import debounce from 'lodash.debounce';
import { useCallback, useMemo, useState } from 'react';

const useExhibitionHook = () => {
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
    extraQuery: filters,
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
  };
};

export default useExhibitionHook;
