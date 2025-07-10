import SearchIcon from '@/components/icons/Search';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table/Table';
import { Input } from '@headlessui/react';
import useCategory from '../hooks/useCategory.hook';
import React from 'react';
import PencilSquareIcon from '@/components/icons/PencilSquare';
import { cn } from '@/libs/utils/cn.utils';
import Pagination from '@/components/ui/table/Pagination';

const CategoryTable: React.FC = () => {
  const { data: categories, isLoading, isFetching, error, onRetry, onMeta, meta } = useCategory();
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
    ) : categories.length === 0 ? (
      'No Category found.'
    ) : null;

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  const headers = ['Name', 'Description', 'Status', 'Actions'];
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
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell
                key={index}
                isHeader
                className="text-center font-semibold"
                sortable={true}
                sortKey={header.toLowerCase()}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {tableStatus ? (
              <TableCell colSpan={headers.length} className="text-center">
                {tableStatus}
              </TableCell>
            ) : (
              categories.map((category, index) => (
                <React.Fragment key={index}>
                  <TableCell className="text-center">{category.name}</TableCell>
                  <TableCell className="text-center">{category.desc}</TableCell>
                  <TableCell
                    className={cn(
                      'text-center',
                      category.status === 1 ? 'text-green-500' : 'text-red-500',
                    )}
                  >
                    {category.status_text}
                  </TableCell>
                  <TableCell className="text-center">
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
                </React.Fragment>
              ))
            )}
          </TableRow>
        </TableBody>
      </Table>
      <Pagination meta={meta} context="categories" onPageChange={(page) => onMeta({ page })} />
    </div>
  );
};

export default CategoryTable;
