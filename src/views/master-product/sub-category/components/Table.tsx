import SearchIcon from '@/components/icons/Search';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table/Table';
import { Input } from '@headlessui/react';
import useSubCategory from '../hooks/useSubCategory';
import TableNoData from '@/components/ui/table/NoData';
import React from 'react';
import dayjs from 'dayjs';
import PencilSquareIcon from '@/components/icons/PencilSquare';

const SubCategoryTable: React.FC = () => {
  const {
    data: subCategories,
    isLoading,
    onSearch,
    isFetching,
    error,
    onRetry,
    // onMeta,
    // meta,
  } = useSubCategory();

  const headers = ['Name', 'Description', 'Created At', 'Updated At', 'Status', 'Actions'];
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
            {!subCategories || subCategories.length === 0 || isLoading || error ? (
              <TableCell colSpan={8} className="text-center">
                <TableNoData
                  isLoading={isLoading}
                  error={error}
                  isFetching={isFetching}
                  onRetry={onRetry}
                  banners={subCategories}
                />
              </TableCell>
            ) : (
              subCategories?.map((subCategory, index) => (
                <React.Fragment key={index}>
                  <TableCell className="text-center">{subCategory.name}</TableCell>
                  <TableCell className="text-center">{subCategory.desc}</TableCell>
                  <TableCell className="text-center">
                    {dayjs(subCategory.createdAt).format('dddd, MMMM DD YYYY, HH:mm')}
                  </TableCell>
                  <TableCell className="text-center">
                    {dayjs(subCategory.updatedAt).format('dddd, MMMM DD YYYY, HH:mm')}
                  </TableCell>
                  <TableCell
                    className={`text-center ${
                      subCategory.status === 1 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {subCategory.status_text}
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
    </div>
  );
};

export default SubCategoryTable;
