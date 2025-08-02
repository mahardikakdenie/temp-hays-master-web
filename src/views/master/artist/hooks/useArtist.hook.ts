import { useGlobal } from '@/contexts/global.context';
import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { Routes } from '@/libs/constants/routes.const';
import { Artist } from '@/types/artist.types';
import { Meta } from '@/types/commons.types';
import debounce from 'lodash.debounce';
import { useCallback, useMemo, useState } from 'react';

const useArtistHook = () => {
  const { onOpenModal } = useGlobal();
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

  const fetchArtist = usePaginatedFetch<Artist>({
    key: 'artist',
    endpoint: Routes.ARTIST_LIST,
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
    ...fetchArtist,
    search: fetchArtist.search || search,
    onSearch: fetchArtist.onSearch || onSearch,
    onMeta: fetchArtist.onMeta || onMeta,
    meta: fetchArtist.meta || meta,
    onChangeEndDate,
    onChangeStartDate,
    onChangeStatus,
    debouncedSearch,
    onOpenModal,
  };
};

export default useArtistHook;
