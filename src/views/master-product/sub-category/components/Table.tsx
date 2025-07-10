import SearchIcon from '@/components/icons/Search';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table/Table';
import { Input } from '@headlessui/react';
import useSubCategory from '../hooks/useSubCategory';
import TableNoData from '@/components/ui/table/NoData';
import React from 'react';
import dayjs from 'dayjs';
import PencilSquareIcon from '@/components/icons/PencilSquare';
import TableLoadingSkeleton from '@/components/ui/table/Loading';

const SubCategoryTable: React.FC = () => {
  const {
    data: subCategories,
    isLoading,
    onSearch,
    isFetching,
    error,
    onRetry,
    onSort,
    sort,
    // onMeta,
    // meta,
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
          <span className="text-lg font-semibold">List Data Banner</span>
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
        <TableHeader>
          <TableRow>
            {headers.map((header) => {
              const isSortable = ['name', 'status'].includes(header.key);
              return (
                <TableCell
                  key={header.key}
                  isHeader
                  className="text-center font-semibold capitalize"
                  sortable={isSortable}
                  sortKey={isSortable ? header.key : undefined} // opsional
                  onSort={isSortable ? onSort : undefined}
                  currentSortColumn={sort.column}
                  currentSortOrder={sort.order}
                >
                  {header.name}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading || isFetching ? <TableLoadingSkeleton columns={headers.length} /> : null}
          {!isLoading && !isFetching && (!subCategories || subCategories.length === 0) ? (
            <TableRow>
              <TableCell isHeader colSpan={headers.length} className="text-center">
                <TableNoData
                  datas={subCategories}
                  isFetching={isFetching}
                  isLoading={isLoading}
                  onRetry={onRetry}
                  error={error}
                />
              </TableCell>
            </TableRow>
          ) : null}

          {/* Data Rows */}
          {!isLoading && !isFetching && subCategories && subCategories.length > 0
            ? subCategories.map((subCategory, index) => (
                <TableRow key={index}>
                  {headers.map((header) => {
                    const value = subCategory[header.key as keyof typeof subCategory];

                    if (header.key === 'created_at' || header.key === 'updated_at') {
                      return (
                        <TableCell key={header.key} className="text-center">
                          {dayjs(value).format('dddd, MMMM DD YYYY, HH:mm')}
                        </TableCell>
                      );
                    }

                    if (header.key === 'status') {
                      return (
                        <TableCell
                          key={header.key}
                          className={`text-center ${
                            subCategory.status === 1 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {subCategory.status_text}
                        </TableCell>
                      );
                    }

                    if (header.key === 'actions') {
                      return (
                        <TableCell key={header.key} className="text-center">
                          <div className="flex justify-center items-center gap-2">
                            <PencilSquareIcon className="size-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
                            <button className="text-red-500 hover:text-red-700">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={header.key} className="text-center">
                        {value instanceof Date
                          ? value.toLocaleString()
                          : value?.toString?.()
                            ? value.toString()
                            : ''}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubCategoryTable;
