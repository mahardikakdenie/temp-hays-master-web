import { useCallback, useState } from 'react';
import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { Routes } from '@/libs/constants/routes.const';
import { Contact } from '@/types/contact.types';

const useContact = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: '',
  });

  const onChangeStartDate = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, startDate: value }));
  }, []);

  const onChangeEndDate = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, endDate: value }));
  }, []);

  const onChangeStatus = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, status: value }));
  }, []);

  const fetchContact = usePaginatedFetch<Contact>({
    key: 'contacts',
    endpoint: Routes.CONTACT_LIST,
    extraQuery: filters,
  });

  return {
    ...fetchContact,
    ...filters,
    onChangeStartDate,
    onChangeEndDate,
    onChangeStatus,
  };
};

export default useContact;
