import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { Routes } from '@/libs/constants/routes.const';
import { Meta } from '@/types/commons.types';
import { Product } from '@/types/product.types';
import { useCallback, useState } from 'react';

const useProductHook = () => {
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

  const fetchProducts = usePaginatedFetch<Product>({
    key: 'product',
    endpoint: Routes.PRODUCT_LISY,
    extraQuery: filters,
  });

  return {
    ...fetchProducts,
    filters,
    meta: fetchProducts.meta || meta,
    onChangeEndDate,
    onChangeStartDate,
    onChangeStatus,
    onMeta,
  };
};

export default useProductHook;
