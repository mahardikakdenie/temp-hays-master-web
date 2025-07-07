import type React from 'react';
import type { UserList } from '@/types/user.types';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table/Table';
import { useGlobal } from '@/contexts/global.context';
import SearchIcon from '@/components/icons/Search';
import PencilSquareIcon from '@/components/icons/PencilSquare';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import Badge from '@/components/ui/badge/Badge';
import Pagination from '@/components/ui/table/Pagination';
import { usePaginatedFetch } from '@/hooks/usePaginateFetch';
import { Routes } from '@/libs/constants/routes.const';
import { Filter } from '@/types/commons.types';

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
    sort,
    onSearch,
    onSort,
    onMeta,
    onRetry,
  } = usePaginatedFetch<UserList>({
    key: 'user',
    endpoint: Routes.USER_LIST,
    extraQuery: appliedFilter,
  });

  const tableStatus =
    isLoading || (error && isFetching) ? (
      'Loading...'
    ) : error ? (
      <div className="flex items-center gap-2">
        <span>{error}</span>
        <button onClick={onRetry} className="text-red-500 underline">
          Try again
        </button>
      </div>
    ) : user.length === 0 ? (
      'No users found.'
    ) : null;

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
        <TableHeader>
          <TableRow>
            <TableCell
              isHeader
              sortable
              sortKey="fullname"
              currentSortColumn={sort.column}
              currentSortOrder={sort.order}
              className="text-start"
              onSort={onSort}
            >
              Name
            </TableCell>
            <TableCell
              isHeader
              sortable
              sortKey="access_name"
              currentSortColumn={sort.column}
              currentSortOrder={sort.order}
              className="text-start"
              onSort={onSort}
            >
              Access
            </TableCell>
            <TableCell
              isHeader
              sortable
              sortKey="email"
              currentSortColumn={sort.column}
              currentSortOrder={sort.order}
              className="text-start"
              onSort={onSort}
            >
              Email
            </TableCell>
            <TableCell
              isHeader
              sortable
              sortKey="phone"
              currentSortColumn={sort.column}
              currentSortOrder={sort.order}
              className="text-start"
              onSort={onSort}
            >
              Phone
            </TableCell>
            <TableCell
              isHeader
              sortable
              sortKey="status"
              currentSortColumn={sort.column}
              currentSortOrder={sort.order}
              className="text-center"
              onSort={onSort}
            >
              Status
            </TableCell>
            <TableCell isHeader className="text-center">
              Action
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableStatus ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-sm text-white/90">
                {tableStatus}
              </TableCell>
            </TableRow>
          ) : (
            user.map((list, index) => (
              <TableRow key={index}>
                <TableCell className="text-start">{list.fullname}</TableCell>
                <TableCell className="text-start">{list.access_name}</TableCell>
                <TableCell className="text-start">{list.email}</TableCell>
                <TableCell className="text-start">{list.phone}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="light" color={list.status === 1 ? 'success' : 'error'}>
                    {list.status_text}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center cursor-pointer">
                    <PencilSquareIcon className="w-5 h-5 text-primary" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Pagination meta={userMeta} context="users" onPageChange={(page) => onMeta({ page })} />
    </div>
  );
};

export default UserTable;
