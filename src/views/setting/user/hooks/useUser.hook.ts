import { useCallback, useState } from 'react';
import { useGlobal } from '@/contexts/global.context';
import type { Filter, Options } from '@/types/commons.types';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { useInternal } from '@/hooks/useInternal';
import { Routes } from '@/libs/constants/routes.const';
import { HttpStatus } from '@/libs/constants/httpStatus.const';

const INITIAL_FILTER = {
  startDate: '',
  endDate: '',
  status: '',
};

const useUser = () => {
  const { onCloseModal } = useGlobal();
  const internalApi = useInternal();

  const [filter, setFilter] = useState<Filter>(INITIAL_FILTER);
  const [appliedFilter, setAppliedFilter] = useState<Filter>(INITIAL_FILTER);

  const onChangeStartDate = useCallback((value: string) => {
    setFilter((prev) => ({
      ...prev,
      startDate: value,
      endDate: dayjs(prev.endDate).isBefore(value) ? '' : prev.endDate,
    }));
  }, []);

  const onChangeEndDate = useCallback((value: string) => {
    setFilter((prev) => ({
      ...prev,
      endDate: value,
    }));
  }, []);

  const onChangeStatus = useCallback((value: string) => {
    setFilter((prev) => ({ ...prev, status: value }));
  }, []);

  const onSubmitFilter = useCallback(() => {
    setAppliedFilter(filter);
    onCloseModal();
  }, [filter, onCloseModal]);

  const onResetFilter = useCallback(() => {
    setFilter(INITIAL_FILTER);
    setAppliedFilter(INITIAL_FILTER);
  }, []);

  const { data: accessOptions } = useQuery<Options[], Error>({
    queryKey: ['user-access-options'],
    queryFn: async () => {
      const response = await internalApi(Routes.USER_ACCESS_OPTION);
      if (response.status !== HttpStatus.OK) {
        throw new Error('Failed to fetch subcategory options');
      }

      const { data } = await response.json();
      return data;
    },
  });

  return {
    filter,
    appliedFilter,
    onChangeStartDate,
    onChangeEndDate,
    onChangeStatus,
    onSubmitFilter,
    onResetFilter,
    accessOptions,
  };
};

export default useUser;
