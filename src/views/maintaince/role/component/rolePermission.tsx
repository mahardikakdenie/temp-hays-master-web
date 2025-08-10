// import HeaderDataUI from '@/components/ui/table/HeaderData';
import { Table, TableCell, TableRow, TableBody, TableHeader } from '@/components/ui/table/Table';
import React from 'react';
import useRolePermissionHook from '../hooks/useRolePermission';
import { cn } from '@/libs/utils/cn.utils';

const PermissionTable = () => {
  const { headers, data, expanded, handleExpandClick, handlePermissionChange, selected } =
    useRolePermissionHook();

  // Hitung jumlah total kolom
  // const totalColumns = headers.length;

  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse">
        {/* Table Header */}
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableCell
                key={header.key}
                className="bg-gray-800 text-gray-200 text-left text-sm font-semibold uppercase tracking-wide"
              >
                {header.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody className="bg-gray-900 text-gray-300">
          {data.map((item) => (
            <React.Fragment key={item.id}>
              {/* Parent Row */}
              <TableRow
                onClick={() => handleExpandClick(`panel${item.id}`)}
                className={cn(
                  'hover:bg-gray-800 transition-colors duration-150',
                  item.is_group &&
                    selected.some((s) =>
                      item.permissions.some(
                        (permission) => permission.privilege_id === s.privilege_id,
                      ),
                    ) &&
                    'cursor-pointer',
                )}
              >
                {/* Kolom 1: Nama Parent */}
                <TableCell className="py-3 px-4 text-sm font-medium text-gray-200">
                  <div className="flex items-center gap-2">
                    {item.is_group &&
                      selected.some((s) =>
                        item.permissions.some(
                          (permission) => permission.privilege_id === s.privilege_id,
                        ),
                      ) && (
                        <span
                          className={cn(
                            'transform transition-transform duration-200 text-xs',
                            expanded === `panel${item.id}` ? 'rotate-180' : 'rotate-0',
                          )}
                        >
                          ▼
                        </span>
                      )}
                    <span className="block max-w-[180px] truncate sm:max-w-xs" title={item.name}>
                      {item.name}
                    </span>
                  </div>
                </TableCell>

                {/* Kolom 2+: Permissions (harus sesuai jumlah header - 1) */}
                {headers.slice(1).map((header) => {
                  const permission = item.permissions.find((p) => p.action === header.key);
                  return (
                    <TableCell key={header.key} className="py-3">
                      {permission && (
                        <input
                          type="checkbox"
                          value={permission.privilege_id}
                          defaultChecked={false}
                          onChange={() => handlePermissionChange(permission)}
                          className="w-4 h-4 bg-gray-700 text-gray-600 border-gray-500 rounded focus:ring-blue-600"
                        />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>

              {/* Child Rows (Collapsible Panel) */}
              {expanded === `panel${item.id}` &&
                item.children.length > 0 &&
                selected.some((s) =>
                  item.permissions.some((permission) => permission.privilege_id === s.privilege_id),
                ) && (
                  <TableRow className="w-full">
                    <TableCell colSpan={5} className="p-0 border-none bg-transparent">
                      <div className="mt-1 mb-2 pl-8 w-full">
                        {/* Indentasi child */}
                        <Table className=" border-collapse">
                          <TableBody className="">
                            {item.children.map((child) => (
                              <TableRow
                                key={child.id}
                                className="hover:bg-gray-800 transition-colors duration-100 border-b border-gray-800 last:border-b-0"
                              >
                                {/* Nama Child */}
                                <TableCell className="px-4 w-sm">
                                  <span className="block truncate" title={child.name}>
                                    {child.name}
                                  </span>
                                </TableCell>

                                {/* Permissions - Child */}
                                {headers.slice(1).map((header) => {
                                  const permission = child.permissions?.find(
                                    (p) => p.action === header.key,
                                  );
                                  return (
                                    <TableCell
                                      key={header.key}
                                      className="text-left py-2 px-2 sm:px-3 md:px-4"
                                    >
                                      {permission && (
                                        <div className="flex">
                                          <input
                                            type="checkbox"
                                            onChange={() => handlePermissionChange(permission)}
                                            className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-500 rounded focus:ring-blue-600"
                                          />
                                        </div>
                                      )}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PermissionTable;
