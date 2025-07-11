import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { Routes } from '@/libs/constants/routes.const';
import { Meta } from '@/types/commons.types';
import { OrderList } from '@/types/orderList.types';
import { useCallback, useState } from 'react';

const useOrderListHook = () => {
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

  const fetchOrderList = usePaginatedFetch<OrderList>({
    key: 'order-list',
    endpoint: Routes.TRASACTION_LIST,
    extraQuery: filters,
  });

  return {
    ...fetchOrderList,
    filters,
    meta: fetchOrderList.meta || meta,
    onChangeEndDate,
    onChangeStartDate,
    onChangeStatus,
    onMeta,
  };
};

export default useOrderListHook;
