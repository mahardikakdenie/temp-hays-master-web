import HeaderDataUI from '@/components/ui/table/HeaderData';
import { Table, TableCell, TableRow, TableBody } from '@/components/ui/table/Table';
import React from 'react';
import useRolePermissionHook from '../hooks/useRolePermission';

const PermissionTable = () => {
  const { headers, data, expanded, handleExpandClick, handlePermissionChange } =
    useRolePermissionHook();
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full border-collapse">
        {/* Table Header */}
        <HeaderDataUI
          headers={headers as { name: string; key: string }[]}
          onSort={() => {}}
          headerWithSorts={[]}
          sort={{ column: '', order: '' }}
        />

        {/* Table Body */}
        <TableBody className="bg-gray-900 text-gray-300">
          {data.map((item) => (
            <React.Fragment key={item.id}>
              {/* Parent Row */}
              <TableRow
                onClick={() => handleExpandClick(`panel${item.id}`)}
                className="cursor-pointer"
              >
                <TableCell className="px-6 py-4 font-medium flex items-center group">
                  <span
                    className={`transform transition-transform duration-200 mr-2 ${
                      expanded === `panel${item.id}` ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    ▼
                  </span>
                  <span>{item.name}</span>
                </TableCell>
                <td colSpan={4}></td>
              </TableRow>

              {/* Child Rows (Collapsible) */}
              {expanded === `panel${item.id}` && item.children.length > 0 && (
                <TableRow>
                  <td colSpan={20} className="p-0 border-none">
                    <div className="mt-2 mb-2">
                      <Table className="w-full border-collapse">
                        <TableBody>
                          {item.children.map((child) => (
                            <TableRow
                              key={child.id}
                              className="hover:bg-gray-800 transition-colors duration-100 border-b border-gray-800"
                            >
                              <TableCell className="px-20 py-3 text-sm font-medium whitespace-nowrap text-ellipsis w-10 text-gray-200">
                                <span className="w-100 block overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-200">
                                  {child.name}
                                </span>
                              </TableCell>
                              <TableCell className="text-center mr-10">
                                <input
                                  type="checkbox"
                                  defaultChecked={child.permissions.fullAccess}
                                  className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-500 rounded focus:ring-blue-600"
                                  onChange={(e) => {
                                    handlePermissionChange(
                                      item.id,
                                      child.id,
                                      'fullAccess',
                                      e.target.checked,
                                    );
                                  }}
                                />
                              </TableCell>
                              <TableCell className="text-center mr-10">
                                <input
                                  type="checkbox"
                                  defaultChecked={child.permissions.read}
                                  className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-500 rounded focus:ring-blue-600"
                                />
                              </TableCell>
                              <TableCell className="text-center mr-10">
                                <input
                                  type="checkbox"
                                  defaultChecked={child.permissions.create}
                                  className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-500 rounded focus:ring-blue-600"
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </td>
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
