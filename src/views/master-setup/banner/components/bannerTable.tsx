import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table/Table';
import SearchIcon from '@/components/icons/Search';
import EllipsisHorizontalIcon from '@/components/icons/EllipsisHorizontal';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import { cn } from '@/libs/utils/cn.utils';

const BannerTable: React.FC = () => {
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Search:', event.target.value);
  };

  const roleHeaders = ['Name', 'Status', 'Actions'];
  const datas = [{ name: 'Admin', status: 'active' }];
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
            {roleHeaders.map((header, index) => (
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
            {datas.map((data, index) => (
              <React.Fragment key={index}>
                <TableCell className="text-center">{data.name}</TableCell>
                <TableCell
                  className={cn(
                    'text-center',
                    data.status === 'active' ? 'text-green-500' : 'text-red-500',
                  )}
                >
                  {data.status}
                </TableCell>
                <TableCell className="text-center">
                  <EllipsisHorizontalIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                </TableCell>
              </React.Fragment>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default BannerTable;
