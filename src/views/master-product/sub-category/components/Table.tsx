import SearchIcon from '@/components/icons/Search';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import { Table } from '@/components/ui/table/Table';
import { Input } from '@headlessui/react';
import useSubCategory from '../hooks/useSubCategory.hook';
import React from 'react';
import HeaderDataUI from '@/components/ui/table/HeaderData';
import TableDataUI from '@/components/ui/table/TableData';
import Pagination from '@/components/ui/table/Pagination';
import { useGlobal } from '@/contexts/global.context';

const SubCategoryTable: React.FC = () => {
  const { onOpenModal } = useGlobal();
  const {
    data: subCategories,
    isLoading,
    onSearch,
    isFetching,
    error,
    onRetry,
    onSort,
    sort,
    onMeta,
    meta,
  } = useSubCategory();

  const headers = [
    {
      name: 'Name',
      key: 'name',
    },
    {
      name: 'Description',
      key: 'desc',
    },
    {
      name: 'Category Name',
      key: 'category_name',
    },
    {
      name: 'Created At',
      key: 'created_at',
    },
    {
      name: 'Updated At',
      key: 'updated_at',
    },
    {
      name: 'Status',
      key: 'status',
    },
    {
      name: 'Actions',
      key: 'actions',
    },
  ];
  return (
    <div className="widget-dark p-6 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div className="hidden md:block">
          <span className="text-lg font-semibold">List Data Sub Categories</span>
        </div>
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
          onSort={onSort}
          sort={sort}
          headerWithSorts={['name', 'status']}
        />

        <TableDataUI
          isLoading={isLoading}
          isFetching={isFetching}
          data={subCategories}
          headers={headers}
          onRetry={onRetry}
          error={error}
          onUpdateClick={(data) => {
            onOpenModal('detail', data);
          }}
        />
      </Table>

      <Pagination
        meta={meta}
        context="sub-categories"
        onPageChange={(page: number) => onMeta({ page })}
      />
    </div>
  );
};

export default SubCategoryTable;
