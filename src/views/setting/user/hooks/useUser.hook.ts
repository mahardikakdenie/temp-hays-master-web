import { useCallback, useState } from 'react';
import { useGlobal } from '@/contexts/global.context';
import type { Filter } from '@/types/commons.types';
import dayjs from 'dayjs';

const INITIAL_FILTER = {
  startDate: '',
  endDate: '',
  status: '',
};

const useUser = () => {
  const { onCloseModal } = useGlobal();

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

  return {
    filter,
    appliedFilter,
    onChangeStartDate,
    onChangeEndDate,
    onChangeStatus,
    onSubmitFilter,
    onResetFilter,
  };
};

export default useUser;
