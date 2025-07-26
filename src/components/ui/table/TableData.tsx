'use client';
import React from 'react';
import dayjs from 'dayjs';
import TableLoadingSkeleton from './Loading';
import TableNoData from './NoData';
import { TableBody, TableCell, TableRow } from './Table';
import PencilSquareIcon from '@/components/icons/PencilSquare';
// import TrashIcon from '@/components/icons/Trash';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/libs/utils/cn.utils';
import { usePermission } from '@/contexts/permission.context';

// types.ts
export type Header = {
  name: string;
  key: string;
};

export type TableDataUIProps<T> = {
  isLoading: boolean;
  isFetching: boolean;
  data: T[];
  headers: Header[];
  onRetry: () => void;
  error: string;
  onUpdateClick?: (data: T) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableDataUI = <T extends Record<string, any>>({
  isLoading,
  isFetching,
  data,
  headers,
  onRetry,
  error,
  onUpdateClick,
}: TableDataUIProps<T>) => {
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const router = useRouter();
  const pathname = usePathname();
  const { hasPermission } = usePermission();
  return (
    <TableBody>
      {/* Loading State */}
      {(isLoading || isFetching) && <TableLoadingSkeleton columns={headers.length} />}

      {/* Empty / Error State */}
      {!isLoading && !isFetching && (!data || data.length === 0) && (
        <TableRow>
          <TableCell isHeader colSpan={headers.length} className="text-center">
            <TableNoData
              datas={data}
              isFetching={isFetching}
              isLoading={isLoading}
              onRetry={onRetry}
              error={error}
            />
          </TableCell>
        </TableRow>
      )}

      {/* Data Rows */}
      {!isLoading &&
        !isFetching &&
        data &&
        data.length > 0 &&
        data.map((item, index) => (
          <TableRow key={index}>
            {headers.map((header) => {
              if (header.key === 'actions') {
                return (
                  <TableCell key="actions" className="text-center">
                    <div className="flex justify-center items-center gap-2">
                      {hasPermission('update') && (
                        <PencilSquareIcon
                          className="size-5 text-blue-500 hover:text-blue-700 cursor-pointer"
                          onClick={() => {
                            if (onUpdateClick) {
                              onUpdateClick(item);
                            } else {
                              router.push(`${pathname}/${item.id}/update`);
                            }
                          }}
                        />
                      )}

                      {/* {hasPermission('delete') && (
                        <TrashIcon className="size-5 text-red-500 hover:text-red-700 cursor-pointer" />
                      )} */}
                    </div>
                  </TableCell>
                );
              }

              const value = item[header.key as keyof T];

              if (
                header.key === 'created_at' ||
                header.key === 'updated_at' ||
                header.key === 'start_date' ||
                header.key === 'end_date'
              ) {
                return (
                  <TableCell key={header.key} className="text-center">
                    {value ? dayjs(value).format('dddd, MMMM DD YYYY') : '-'}
                  </TableCell>
                );
              }

              if (header.key === 'title' || header.key === 'sub_title' || header.key == 'desc') {
                return (
                  <TableCell className="text-center" key={header.key}>
                    {stripHtml(item[header.key])}
                  </TableCell>
                );
              }

              if (header.key === 'status') {
                return (
                  <TableCell
                    key={header.key}
                    className={cn(
                      'text-center',
                      item.status === 1 ? 'text-green-500' : 'text-red-500',
                    )}
                  >
                    {item.status_text}
                  </TableCell>
                );
              }

              if (header.key === 'type') {
                return (
                  <TableCell key={header.key} className={cn('text-center capitalize')}>
                    {item.type}
                  </TableCell>
                );
              }

              return (
                <TableCell key={header.key} className="text-center">
                  {value === null || value === undefined
                    ? '-'
                    : (value as Date) instanceof Date
                      ? dayjs(value).format('YYYY-MM-DD HH:mm')
                      : typeof value === 'object'
                        ? JSON.stringify(value)
                        : String(value)}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
    </TableBody>
  );
};

export default TableDataUI;
