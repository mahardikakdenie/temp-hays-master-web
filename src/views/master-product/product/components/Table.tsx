import SearchIcon from '@/components/icons/Search';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import { Input } from '@headlessui/react';
import useProductHook from '../hooks/useProduct.hook';
import { Table } from '@/components/ui/table/Table';
import HeaderDataUI from '@/components/ui/table/HeaderData';
import TableDataUI from '@/components/ui/table/TableData';
import Pagination from '@/components/ui/table/Pagination';

const ProductTable: React.FC = () => {
  const { onSearch, onSort, sort, data, isLoading, isFetching, onRetry, error, meta, onMeta } =
    useProductHook();

  const headers = [
    {
      key: 'name',
      name: 'Name',
    },
    {
      key: 'artist_name',
      name: 'Artist Name',
    },
    {
      key: 'theme_name',
      name: 'Theme Name',
    },
    {
      key: 'category_name',
      name: 'Category Name',
    },
    {
      key: 'created_at',
      name: 'Created at',
    },
    {
      key: 'updated_at',
      name: 'Updated At',
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
          <span className="text-lg font-semibold">List Data Products</span>
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
          headerWithSorts={['name', 'status', 'artist_name', 'category_name', 'theme_name']}
          onSort={onSort}
          sort={sort}
        />

        <TableDataUI
          headers={headers}
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          onRetry={onRetry}
          error={error}
        />
      </Table>

      <Pagination
        meta={meta}
        context="products"
        onPageChange={(page: number) => onMeta({ page })}
      />
    </div>
  );
};

export default ProductTable;
