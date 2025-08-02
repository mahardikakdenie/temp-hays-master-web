import React from 'react';
import { Table } from '@/components/ui/table/Table';
import SearchIcon from '@/components/icons/Search';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import useBanner from '../banner.hook';
import Pagination from '@/components/ui/table/Pagination';
import HeaderDataUI from '@/components/ui/table/HeaderData';
import TableDataUI from '@/components/ui/table/TableData';
import ModalFilterBanner from './ModalFilterBanner';

const BannerTable: React.FC = () => {
  const {
    isLoading,
    isFetching,
    data: banners,
    error,
    meta,
    onSearch,
    onRetry,
    onMeta,
    sort,
    onSort,
    filters,
    onChangeStartDate,
    onChangeEndDate,
    onChangeStatus,
    onSubmitFilter,
    onResetFilter,
    onOpenModal,
  } = useBanner();

  const headers = [
    {
      name: 'Title',
      key: 'title',
    },
    {
      name: 'Sub Title',
      key: 'sub_title',
    },
    {
      name: 'Type',
      key: 'type',
    },
    {
      name: 'Status',
      key: 'status',
    },
    {
      name: 'Created at',
      key: 'created_at',
    },
    {
      name: 'Updated at',
      key: 'updated_at',
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
          <span className="text-lg font-semibold">List Data Banner</span>
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
          <ButtonSecondary onClick={() => onOpenModal('filter')} className="w-full lg:w-40">
            Filter
          </ButtonSecondary>
        </div>
      </div>

      <Table>
        <HeaderDataUI
          headers={headers}
          sort={sort}
          onSort={onSort}
          headerWithSorts={['title', 'title', 'sub_title', 'type', 'status']}
        />
        <TableDataUI
          isLoading={isLoading}
          isFetching={isFetching}
          data={banners}
          headers={headers}
          onRetry={onRetry}
          error={error}
        />
      </Table>
      <Pagination meta={meta} context="banners" onPageChange={(page) => onMeta({ page })} />

      <ModalFilterBanner
        filter={filters}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        onChangeStatus={onChangeStatus}
        onSubmitFilter={onSubmitFilter}
        onResetFilter={onResetFilter}
      />
    </div>
  );
};

export default BannerTable;
