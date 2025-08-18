'use client';
import React from 'react';
import useRolePermissionHook from '../hooks/useRolePermission';
import { cn } from '@/libs/utils/cn.utils';

type PermissionProps = {
  onSelectedPermission: (selected: { privilege_id: number }[]) => void;
  initialSelected?: { privilege_id: number }[];
  isLoading?: boolean;
};

const PermissionTable: React.FC<PermissionProps> = ({
  onSelectedPermission,
  initialSelected,
  isLoading = false,
}) => {
  const { headers, data, expanded, handleExpandClick, handlePermissionChange, selected } =
    useRolePermissionHook(onSelectedPermission, initialSelected, isLoading);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-6 h-6 border-2 border-t-transparent border-white/90 rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-400">Loading permissions...</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table
        className="min-w-full border-collapse table-fixed rounded-2xl"
        style={{ tableLayout: 'fixed' }}
      >
        {/* Table Header */}
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header.key}
                className="bg-gray-500 text-gray-200 text-center text-sm font-semibold uppercase tracking-wide px-3 py-3 w-1/6"
              >
                {header.name}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-gray-900 text-gray-300 rounded-2xl">
          {data.map((item) => (
            <React.Fragment key={item.id}>
              {/* Parent Row */}
              <tr
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
                {/* Nama Parent */}
                <td className="px-3 py-5 text-sm font-medium text-gray-200">
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
                    <span
                      className="block truncate max-w-[120px] sm:max-w-[150px] md:max-w-xs"
                      title={item.name}
                    >
                      {item.name}
                    </span>
                  </div>
                </td>

                {/* Permissions - Parent */}
                {headers.slice(1).map((header) => {
                  const permission = item.permissions.find((p) => p.action === header.key);
                  return (
                    <td key={header.key} className="px-3 py-3 text-center">
                      {permission && (
                        <div className="flex items-center justify-center h-6">
                          <input
                            type="checkbox"
                            checked={selected.some(
                              (s) => s.privilege_id === permission.privilege_id,
                            )}
                            onChange={() => handlePermissionChange(permission)}
                            className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-500 rounded focus:ring-blue-600"
                          />
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Child Rows (Collapsible Panel) */}
              {expanded === `panel${item.id}` &&
                item.children.length > 0 &&
                selected.some((s) =>
                  item.permissions.some((permission) => permission.privilege_id === s.privilege_id),
                ) && (
                  <tr>
                    <td colSpan={headers.length} className="p-0 border-none bg-transparent">
                      <div className="mt-1 mb-2 pl-8">
                        {' '}
                        {/* Indentasi child */}
                        <table
                          className="min-w-full border-collapse table-fixed"
                          style={{ tableLayout: 'fixed' }}
                        >
                          <tbody>
                            {item.children.map((child) => (
                              <tr
                                key={child.id}
                                className="hover:bg-gray-800 transition-colors duration-100 border-b border-gray-800 last:border-b-0"
                              >
                                {/* Nama Child */}
                                <td className="px-3 py-5 text-sm font-medium text-gray-200 truncate max-w-[59px] sm:max-w-[36px] md:max-w-[34.7px] lg:max-w-[33px] xl:max-w-[35.6px]">
                                  <span title={child.name}>{child.name}</span>
                                </td>

                                {/* Permissions - Child */}
                                {headers.slice(1).map((header) => {
                                  const permission = child.permissions?.find(
                                    (p) => p.action === header.key,
                                  );
                                  return (
                                    <td key={header.key} className="px-3 py-2 text-center">
                                      {permission && (
                                        <div className="flex items-center justify-center h-6">
                                          <input
                                            type="checkbox"
                                            checked={selected.some(
                                              (s) => s.privilege_id === permission.privilege_id,
                                            )}
                                            onChange={() => handlePermissionChange(permission)}
                                            className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-500 rounded focus:ring-blue-600"
                                          />
                                        </div>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionTable;
