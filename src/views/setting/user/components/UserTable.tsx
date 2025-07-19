import type React from 'react';
import type { UserList } from '@/types/user.types';
import { Table } from '@/components/ui/table/Table';
import { useGlobal } from '@/contexts/global.context';
import SearchIcon from '@/components/icons/Search';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import Pagination from '@/components/ui/table/Pagination';
import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { Routes } from '@/libs/constants/routes.const';
import { Filter } from '@/types/commons.types';
import TableDataUI from '@/components/ui/table/TableData';
import HeaderDataUI from '@/components/ui/table/HeaderData';

type UserTableProps = {
  appliedFilter: Filter;
};

const UserTable: React.FC<UserTableProps> = ({ appliedFilter }) => {
  const { onOpenModal } = useGlobal();

  const {
    isLoading,
    isFetching,
    data: user,
    meta: userMeta,
    error,
    search,
    onSearch,
    onMeta,
    onRetry,
    onSort,
    sort,
  } = usePaginatedFetch<UserList>({
    key: 'user',
    endpoint: Routes.USER_LIST,
    extraQuery: appliedFilter,
  });

  const headers = [
    {
      key: 'fullname',
      name: 'Name',
    },
    {
      key: 'access_name',
      name: 'Access',
    },
    {
      key: 'email',
      name: 'Email',
    },
    {
      key: 'phone',
      name: 'Phone',
    },
    {
      key: 'status',
      name: 'Status',
    },
    {
      key: 'actions',
      name: 'Actions',
    },
  ];

  return (
    <div className="widget-dark p-6 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div className="hidden md:block">
          <span className="text-lg font-semibold">Data User</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full sm:min-w-[300px]">
            <Input
              className="bg-ui-800 py-3 border-none"
              placeholder="Search user..."
              icon={<SearchIcon className="w-5 h-5" />}
              iconPosition="left"
              onChange={onSearch}
              value={search}
            />
          </div>
          <ButtonSecondary className="w-full lg:w-40" onClick={() => onOpenModal('filter')}>
            Filter
          </ButtonSecondary>
        </div>
      </div>

      <Table>
        <HeaderDataUI
          headers={headers}
          sort={sort}
          onSort={onSort}
          headerWithSorts={['fullname', 'access_name', 'email', 'status', 'phone']}
        />
        <TableDataUI
          headers={headers}
          isLoading={isLoading}
          isFetching={isFetching}
          data={user}
          onRetry={onRetry}
          error={error}
        />
      </Table>
      <Pagination meta={userMeta} context="users" onPageChange={(page) => onMeta({ page })} />
    </div>
  );
};

export default UserTable;
