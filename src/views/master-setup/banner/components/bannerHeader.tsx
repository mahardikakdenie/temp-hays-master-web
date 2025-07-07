import type React from 'react';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';

const UserHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-end">
      <div>
        <span className="text-xl font-semibold block mb-2">Banner</span>
        <Breadcrumbs
          items={[
            { title: 'Master Setup', href: '#' },
            { title: 'Banner', href: '/master-setup/banner' },
          ]}
        />
      </div>

      <div>
        <ButtonPrimary className="w-full">Add New Banner</ButtonPrimary>
      </div>
    </div>
  );
};

export default UserHeader;
