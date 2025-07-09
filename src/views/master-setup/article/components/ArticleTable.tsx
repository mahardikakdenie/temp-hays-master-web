import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table/Table';
import SearchIcon from '@/components/icons/Search';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import { cn } from '@/libs/utils/cn.utils';
import useArticle from '../article.hook';

const ArticleTable: React.FC = () => {
  const {
    isLoading,
    isFetching,
    data: article,
    error,
    // sort,
    // meta,
    // setMeta,
    // onSearch,
    // onSort,
    onRetry,
  } = useArticle();
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Search:', event.target.value);
  };

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
    ) : article.length === 0 ? (
      'No Article found.'
    ) : null;

  const headers = ['Title', 'Status', 'Actions'];
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
              <TableCell colSpan={8} className="text-center">
                {tableStatus}
              </TableCell>
            ) : (
              article.map((data, index) => (
                <React.Fragment key={index}>
                  <TableCell className="text-center">{data.title}</TableCell>
                  <TableCell
                    className={cn(
                      'text-center',
                      data.status === 1 ? 'text-green-500' : 'text-red-500',
                    )}
                  >
                    {data.status_text}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button className="text-blue-500 hover:text-blue-700">
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
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>

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

export default ArticleTable;
