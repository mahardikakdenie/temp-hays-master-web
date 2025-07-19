import type React from 'react';
import PageHeader from '@/components/ui/page/Header';
import { useRouter } from 'next/navigation';

const CategoryHeader: React.FC = () => {
  const items = [
    { title: 'Master Product', href: '#' },
    { title: 'Category', href: '/master-setup/category' },
  ];
  const router = useRouter();
  return (
    <PageHeader
      items={items}
      title="Category"
      titleButton="Add new Category"
      isShowBtn
      onClick={() => router.push('/master-product/category/create')}
    />
  );
};

export default CategoryHeader;
