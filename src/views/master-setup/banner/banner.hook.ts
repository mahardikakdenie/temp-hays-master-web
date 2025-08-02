import { useCallback, useState } from 'react';
import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { Routes } from '@/libs/constants/routes.const';
import { bannerList } from '@/types/banner.types';
import { Filter, Meta } from '@/types/commons.types';
import { useGlobal } from '@/contexts/global.context';

const INITIAL_FILTER = {
  startDate: '',
  endDate: '',
  status: '',
};

const useBanner = () => {
  const { onCloseModal, onOpenModal } = useGlobal();
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: '',
  });

  const [appliedFilter, setAppliedFilter] = useState<Filter>(INITIAL_FILTER);

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

  const onSubmitFilter = useCallback(() => {
    setAppliedFilter(filters);
    onCloseModal();
  }, [filters, onCloseModal]);

  const onResetFilter = useCallback(() => {
    setFilters(INITIAL_FILTER);
    setAppliedFilter(INITIAL_FILTER);
  }, []);

  const fetchBanner = usePaginatedFetch<bannerList>({
    key: 'banners',
    endpoint: Routes.BANNER_LIST,
    extraQuery: filters,
  });

  return {
    ...fetchBanner,
    filters,
    onChangeStartDate,
    onChangeEndDate,
    onChangeStatus,
    onMeta,
    meta: fetchBanner.meta || meta,
    onResetFilter,
    onSubmitFilter,
    appliedFilter,
    onOpenModal,
  };
};

export default useBanner;
