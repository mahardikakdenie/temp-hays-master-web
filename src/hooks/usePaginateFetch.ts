import type { Meta, Sort } from '@/types/commons.types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import { useInternal } from './useInternal';

type UsePaginateFetchProps = {
  key: string;
  endpoint: string;
  extraQuery?: Record<string, string>;
};

type FetchResponse<T> = { items: T[]; meta: Meta };

export const usePaginatedFetch = <T>(props: UsePaginateFetchProps) => {
  const { key, endpoint, extraQuery = {} } = props;

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sort, setSort] = useState<Sort>({ column: '', order: '' });
  const [meta, setMeta] = useState<Meta>({
    page: 1,
    limit: 10,
    totalData: 0,
    totalPage: 0,
  });

  const internalAPI = useInternal();

  const queryKey = [
    key,
    {
      page: meta.page,
      limit: meta.limit,
      search: debouncedSearch,
      orderBy: sort.column,
      sort: sort.order,
      ...extraQuery,
    },
  ];

  const fetchData = async (): Promise<FetchResponse<T>> => {
    const query = {
      page: meta.page,
      limit: meta.limit,
      search: debouncedSearch || undefined,
      orderBy: sort.column || undefined,
      sort: sort.order || undefined,
      ...extraQuery,
    };

    const res = await internalAPI(endpoint, query);

    if (res.status !== HttpStatus.OK) throw new Error('Failed to fetch data.');

    const { data } = await res.json();

    const itemsPagination = data.items;
    const metaPagination = {
      page: data.meta.page,
      limit: data.meta.totalPerPage,
      totalData: data.meta.totalData,
      totalPage: data.meta.totalPage,
    };

    return {
      items: itemsPagination,
      meta: metaPagination,
    };
  };

  const { data, error, isLoading, isFetching, isSuccess, isError, refetch } = useQuery({
    queryKey,
    queryFn: fetchData,
    placeholderData: keepPreviousData,
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

  const onSort = useCallback((column: string) => {
    setSort((prev) => ({
      column,
      order: prev.column === column && prev.order === 'ASC' ? 'DESC' : 'ASC',
    }));
  }, []);

  const onMeta = useCallback((meta: Partial<Meta>) => {
    setMeta((prev) => ({ ...prev, ...meta }));
  }, []);

  const onRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  return {
    isLoading,
    isFetching,
    isSuccess,
    isError,
    data: data?.items ?? [],
    meta: data?.meta ?? meta,
    error: error?.message ?? '',
    search,
    sort,
    onSearch,
    onSort,
    onMeta,
    onRetry,
  };
};
