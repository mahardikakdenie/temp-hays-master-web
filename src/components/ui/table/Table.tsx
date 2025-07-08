import type React from 'react';
import { cn } from '@/libs/utils/cn.utils';
import ChevronUpIcon from '@/components/icons/ChevronUp';
import ChevronDownIcon from '@/components/icons/ChevronDown';

type TableProps = {
  children: React.ReactNode;
  className?: string;
};

type TableHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

type TableRowProps = {
  children: React.ReactNode;
  className?: string;
};

type TableBodyProps = {
  children: React.ReactNode;
  className?: string;
};

type TableCellProps = {
  children: React.ReactNode;
  isHeader?: boolean;
  sortable?: boolean;
  sortKey?: string;
  className?: string;
  colSpan?: number;
  currentSortColumn?: string;
  currentSortOrder?: 'ASC' | 'DESC' | '';
  onSort?: (key: string) => void;
};

const Table: React.FC<TableProps> = ({ children, className }) => {
  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className={cn('min-w-full text-sm', className)}>{children}</table>
    </div>
  );
};

const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return <thead className={cn('text-xs uppercase bg-ui-800', className)}>{children}</thead>;
};

const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  return <tr className={className}>{children}</tr>;
};

const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return (
    <tbody
      className={cn('divide-y divide-secondary/[8%] border-b border-secondary/[8%]', className)}
    >
      {children}
    </tbody>
  );
};

const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  sortable,
  sortKey,
  className,
  colSpan,
  currentSortColumn,
  currentSortOrder,
  onSort,
}) => {
  const Element = isHeader ? 'th' : 'td';

  const isActive = sortKey === currentSortColumn;
  const isAsc = isActive && currentSortOrder === 'ASC';
  const isDesc = isActive && currentSortOrder === 'DESC';

  const justifyMap = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  } as const;

  const onJustify = (className?: string): string => {
    const alignment = className?.match(/text-(left|center|right)/)?.[1] as keyof typeof justifyMap;
    return justifyMap[alignment] ?? 'justify-start';
  };

  const onClick = () => {
    if (sortable && sortKey && onSort) onSort(sortKey);
  };

  const justifyClass = onJustify(className);

  return (
    <Element
      className={cn('whitespace-nowrap px-6 py-5', sortable && 'cursor-pointer', className)}
      colSpan={colSpan}
      onClick={onClick}
    >
      <div className={cn('flex items-center gap-2', justifyClass)}>
        {children}
        {sortable && currentSortOrder && isActive && (
          <span className="flex flex-col items-center justify-center text-gray-400">
            <ChevronUpIcon className={cn('w-2.5 h-2.5', isAsc && 'text-white/90')} />
            <ChevronDownIcon className={cn('w-2.5 h-2.5 -mt-0.5', isDesc && 'text-white/90')} />
          </span>
        )}
      </div>
    </Element>
  );
};

export { Table, TableHeader, TableRow, TableBody, TableCell };
