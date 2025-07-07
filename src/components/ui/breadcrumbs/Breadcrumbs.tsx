import type React from 'react';
import Link from 'next/link';
import ChevronRightIcon from '@/components/icons/ChevronRight';
import Square2x2Icon from '@/components/icons/Square2x2';

type BreadcrumbItems = {
  title: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItems[];
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {/* HOME */}
        <li className="inline-flex items-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm font-medium text-primary"
          >
            <Square2x2Icon className="w-5 h-5 mr-2" />
            Home
          </Link>
        </li>
        {/* ITEMS */}
        {items.map((item, index) => (
          <li key={item.title}>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              <div className="ms-1 text-sm font-medium md:ms-2">
                {index < items.length - 1 ? (
                  <Link href={item.href}>{item.title}</Link>
                ) : (
                  <span>{item.title}</span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
