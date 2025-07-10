// components/ui/table/TableLoadingSkeleton.tsx
import React from 'react';

const TableLoadingSkeleton: React.FC<{ columns: number; rows?: number }> = ({
  columns,
  rows = 2,
}) => {
  return (
    <tr>
      <td colSpan={columns} className="p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="h-10 bg-ui-700 rounded-md"></div>
          ))}
        </div>
      </td>
    </tr>
  );
};

export default TableLoadingSkeleton;
