import type React from 'react';
import PageHeader from '@/components/ui/page/Header';
import { useGlobal } from '@/contexts/global.context';

const CategoryHeader: React.FC = () => {
  const { onOpenModal } = useGlobal();
  const items = [
    { title: 'Master Product', href: '#' },
    { title: 'Category', href: '/master-setup/category' },
  ];
  return (
    <PageHeader
      items={items}
      title="Category"
      titleButton="Add new Category"
      isShowBtn
      onClick={() => onOpenModal('add')}
    />
  );
};

export default CategoryHeader;
