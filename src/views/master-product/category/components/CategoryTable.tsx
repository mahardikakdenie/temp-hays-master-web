import SearchIcon from '@/components/icons/Search';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import { Table } from '@/components/ui/table/Table';
import { Input } from '@headlessui/react';
import useCategory from '../hooks/useCategory.hook';
import React from 'react';
import Pagination from '@/components/ui/table/Pagination';
import HeaderDataUI from '@/components/ui/table/HeaderData';
import TableDataUI from '@/components/ui/table/TableData';

const CategoryTable: React.FC = () => {
  const {
    data: categories,
    isLoading,
    isFetching,
    error,
    onRetry,
    onMeta,
    meta,
    onSort,
    sort,
    onSearch,
  } = useCategory();

  const headers = [
    {
      key: 'name',
      name: 'Name',
    },
    {
      key: 'desc',
      name: 'Description',
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Category List</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full sm:min-w-[300px]">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="w-5 h-5 text-gray-400" />
              </span>
              <Input
                className="bg-ui-800 py-3 border-none pl-10 w-full"
                placeholder="Search..."
                onChange={onSearch}
              />
            </div>
          </div>
          <ButtonSecondary className="w-full lg:w-40">Filter</ButtonSecondary>
        </div>
      </div>

      <Table>
        <HeaderDataUI
          headers={headers}
          headerWithSorts={['name', 'status']}
          sort={sort}
          onSort={onSort}
        />
        <TableDataUI
          data={categories}
          headers={headers}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
          onRetry={onRetry}
        />
      </Table>
      <Pagination meta={meta} context="categories" onPageChange={(page) => onMeta({ page })} />
    </div>
  );
};

export default CategoryTable;
