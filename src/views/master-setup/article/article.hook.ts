import { useCallback, useMemo, useState } from 'react';
import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { Routes } from '@/libs/constants/routes.const';
import { ArticleList } from '@/types/article.types';
import { Meta } from '@/types/commons.types';
import debounce from 'lodash.debounce';

// type FetchResponse<T> = { items: T[]; meta: Meta };

const useArticle = (props: { key: string; extraQuery?: Record<string, string> }) => {
  const { key, extraQuery = {} } = props;
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

  const queryKey = [
    key,
    {
      page: meta.page,
      limit: meta.limit,
      search: debouncedSearch,
      ...extraQuery,
    },
  ];

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

  const fetchArticle = usePaginatedFetch<ArticleList>({
    key: 'articles',
    endpoint: Routes.ARTICLE_LIST,
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
    ...fetchArticle,
    items: fetchArticle.data,
    meta: fetchArticle.meta,
    onSearch,
    ...filters,
    onChangeStartDate,
    onChangeEndDate,
    onChangeStatus,
    onMeta,
    search,
    queryKey,
    onSort: fetchArticle.onSort,
  };
};

export default useArticle;
