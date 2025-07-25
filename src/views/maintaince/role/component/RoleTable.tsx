import React from 'react';
import { Table } from '@/components/ui/table/Table';
import SearchIcon from '@/components/icons/Search';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import TableDataUI from '@/components/ui/table/TableData';
import HeaderDataUI from '@/components/ui/table/HeaderData';
import useRole from '../role.hook';

const RoleTable: React.FC = () => {
  const {
    isLoading,
    isFetching,
    data,
    error,
    // meta,
    onRetry,
    // onMeta,
    sort,
    onSort,
    onSearch,
  } = useRole();

  const roleHeaders = [
    {
      name: 'Name',
      key: 'name',
    },
    {
      name: 'Status',
      key: 'status',
    },
    { name: 'Actions', key: 'actions' },
  ];
  return (
    <div className="widget-dark p-6 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div className="hidden md:block">
          <span className="text-lg font-semibold">List Data User</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full sm:min-w-[300px]">
            <Input
              className="bg-ui-800 py-3 border-none"
              placeholder="Search..."
              icon={<SearchIcon className="w-5 h-5" />}
              iconPosition="left"
              onChange={onSearch}
            />
          </div>
          <ButtonSecondary className="w-full lg:w-40">Filter</ButtonSecondary>
        </div>
      </div>

      <Table>
        <HeaderDataUI headers={roleHeaders} headerWithSorts={[]} onSort={onSort} sort={sort} />

        <TableDataUI
          headers={roleHeaders}
          data={data}
          onRetry={onRetry}
          error={error}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </Table>
    </div>
  );
};

export default RoleTable;
