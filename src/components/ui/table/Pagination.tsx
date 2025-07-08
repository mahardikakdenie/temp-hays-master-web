import type React from 'react';
import type { Meta } from '@/types/commons.types';
import { useMemo } from 'react';
import { useSidebar } from '@/contexts/sidebar.context';
import { cn } from '@/libs/utils/cn.utils';
import ChevronRightIcon from '@/components/icons/ChevronRight';
import ChevronLeftIcon from '@/components/icons/ChevronLeft';
import EllipsisHorizontalIcon from '@/components/icons/EllipsisHorizontal';

type PaginationProps = {
  meta: Meta;
  context: string;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ meta, context, onPageChange }) => {
  const { page, limit, totalData, totalPage } = meta;
  const { isMobile } = useSidebar();

  const maxVisible = isMobile ? 2 : 4;

  const start = useMemo(() => {
    if (totalData === 0) return 0;
    return (page - 1) * limit + 1;
  }, [page, limit, totalData]);

  const end = useMemo(() => {
    if (totalData === 0) return 0;
    return Math.min(page * limit, totalData);
  }, [page, limit, totalData]);

  const pages = useMemo(() => {
    const renderPages: (number | React.JSX.Element)[] = [];

    const half = Math.floor(maxVisible / 2);
    let startPage = Math.max(1, page - half);
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPage) {
      endPage = totalPage;
      startPage = Math.max(1, totalPage - maxVisible + 1);
    }

    if (startPage > 1) {
      renderPages.push(1);
      if (startPage > 2) renderPages.push(<EllipsisHorizontalIcon className="w-5 h-5" />);
    }

    for (let i = startPage; i <= endPage; i++) {
      renderPages.push(i);
    }

    if (endPage < totalPage) {
      if (endPage < totalPage - 1) renderPages.push(<EllipsisHorizontalIcon className="w-5 h-5" />);
      renderPages.push(totalPage);
    }

    return renderPages;
  }, [page, totalPage, maxVisible]);

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
      {/* RESULT */}
      <span className="text-sm">
        Showing {start} to {end} of {totalData} {context}
      </span>
      {/* PAGINATION */}
      <div className="flex items-center gap-2 h-8">
        <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
          <ChevronLeftIcon className="w-4 h-4" />
        </button>

        {pages.map((p, idx) =>
          typeof p === 'number' ? (
            <button
              key={idx}
              onClick={() => onPageChange(p)}
              className={`min-w-8 min-h-8 px-2 text-sm text-white/90 text-center rounded-full ${cn(
                p === page ? 'bg-primary' : 'border border-secondary/[16%]',
              )}`}
            >
              {p}
            </button>
          ) : (
            <span key={idx} className="px-2 py-1 text-white/90 text-sm">
              {p}
            </span>
          ),
        )}

        <button onClick={() => onPageChange(page + 1)} disabled={page === totalPage}>
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
