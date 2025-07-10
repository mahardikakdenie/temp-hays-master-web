import type React from 'react';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import { useGlobal } from '@/contexts/global.context';

const CategoryHeader: React.FC = () => {
  const { onOpenModal } = useGlobal();
  return (
    <div className="flex justify-between items-end">
      <div>
        <span className="text-xl font-semibold block mb-2">Category</span>
        <Breadcrumbs
          items={[
            { title: 'Master Product', href: '#' },
            { title: 'Category', href: '/master-setup/category' },
          ]}
        />
      </div>

      <div>
        <ButtonPrimary className="w-full" onClick={() => onOpenModal('add')}>
          Add New Category
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default CategoryHeader;
