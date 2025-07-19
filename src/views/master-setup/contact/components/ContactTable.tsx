import React from 'react';
import { Table } from '@/components/ui/table/Table';
import SearchIcon from '@/components/icons/Search';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import useContact from '../contact.hook';
import Pagination from '@/components/ui/table/Pagination';
import HeaderDataUI from '@/components/ui/table/HeaderData';
import TableDataUI from '@/components/ui/table/TableData';

const ContactTable: React.FC = () => {
  const {
    isLoading,
    isFetching,
    data: contacts,
    error,
    sort,
    meta,
    onMeta,
    // setMeta,
    onSearch,
    onSort,
    onRetry,
  } = useContact();

  const headers = [
    { name: 'Name', key: 'name' },
    {
      name: 'Email',
      key: 'email',
    },
    {
      name: 'Phone',
      key: 'phone',
    },
    {
      name: 'WhatsApp Phone',
      key: 'wa_phone',
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
          <span className="text-lg font-semibold">List Data Contact</span>
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
        <HeaderDataUI
          headerWithSorts={headers
            .filter((header) => header.key !== 'actions')
            .map((header) => header.key)}
          onSort={onSort}
          sort={sort}
          headers={headers}
        />

        <TableDataUI
          data={contacts}
          isFetching={isFetching}
          isLoading={isLoading}
          onRetry={onRetry}
          headers={headers}
          error={error}
        />
      </Table>
      <Pagination meta={meta} context="contacts" onPageChange={(page) => onMeta({ page })} />
    </div>
  );
};

export default ContactTable;
