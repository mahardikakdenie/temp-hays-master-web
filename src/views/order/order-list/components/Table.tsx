import SearchIcon from '@/components/icons/Search';
import useOrderListHook from '../hooks/useOrderList.hook';
import { Input } from '@headlessui/react';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import HeaderDataUI from '@/components/ui/table/HeaderData';
import TableDataUI from '@/components/ui/table/TableData';

const OrderListTable: React.FC = () => {
  const { onSearch, sort, onSort, data, isFetching, isLoading, onRetry, error } =
    useOrderListHook();

  const headers = [
    {
      key: 'name',
      name: 'Name',
    },
    {
      key: 'email',
      name: 'email',
    },
    {
      key: 'phone',
      name: 'Phone',
    },
    {
      key: 'grand_total',
      name: 'Grand Total',
    },
    {
      key: 'transaction_status_text',
      name: 'Transsaction Status',
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

      <HeaderDataUI
        headers={headers}
        headerWithSorts={headers
          .filter((header) => header.key === 'actions')
          .map((header) => header.key)}
        sort={sort}
        onSort={onSort}
      />

      <TableDataUI
        headers={headers}
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        onRetry={onRetry}
        error={error}
      />
    </div>
  );
};

export default OrderListTable;
