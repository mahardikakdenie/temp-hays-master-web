import React from 'react';
import { Table } from '@/components/ui/table/Table';
import SearchIcon from '@/components/icons/Search';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import useArticle from '../article.hook';
import Pagination from '@/components/ui/table/Pagination';
import HeaderDataUI from '@/components/ui/table/HeaderData';
import TableDataUI from '@/components/ui/table/TableData';
import ModalFilter from '@/components/ui/modal/ModalFilter';

const ArticleTable: React.FC = () => {
  const {
    isLoading,
    isFetching,
    data: article,
    error,
    sort,
    // sort,
    meta,
    // setMeta,
    onSearch,
    onSort,
    onMeta,
    onRetry,
    onResetFilter,
    onSubmitFilter,
    filters,
    onChangeEndDate,
    onChangeStartDate,
    onChangeStatus,
    onOpenModal,
  } = useArticle({ key: 'article', extraQuery: {} });
  const headers = [
    {
      name: 'Title',
      key: 'title',
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
          <span className="text-lg font-semibold">List Data Article</span>
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
        <HeaderDataUI headerWithSorts={['title']} headers={headers} onSort={onSort} sort={sort} />

        <TableDataUI
          data={article}
          headers={headers}
          isLoading={isLoading}
          isFetching={isFetching}
          onRetry={onRetry}
          error={error}
        />
      </Table>
      <Pagination meta={meta} context="article" onPageChange={(page) => onMeta({ page })} />

      <ModalFilter
        title="Filter Article"
        filter={filters}
        onChangeEndDate={onChangeEndDate}
        onChangeStartDate={onChangeStartDate}
        onChangeStatus={onChangeStatus}
        onSubmitFilter={onSubmitFilter}
        onResetFilter={onResetFilter}
      />
    </div>
  );
};

export default ArticleTable;
