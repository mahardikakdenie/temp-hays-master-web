import { Sort } from '@/types/commons.types';
import { TableCell, TableHeader, TableRow } from './Table';

const HeaderDataUI: React.FC<{
  headers: Array<{ name: string; key: string }>;
  onSort: (column: string) => void;
  sort: Sort;
  headerWithSorts: string[];
}> = ({ headers, onSort, sort, headerWithSorts = ['name', 'status'] }) => {
  return (
    <TableHeader>
      <TableRow>
        {headers.map((header) => {
          const isSortable = headerWithSorts.includes(header.key);
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
  );
};

export default HeaderDataUI;
