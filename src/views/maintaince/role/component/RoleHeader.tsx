import type React from 'react';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';

const UserHeader: React.FC = () => {
  const itemBreadcrumbs = [
    { title: 'Setting', href: '#' },
    { title: 'Role', href: '/maintaince/role' },
  ];
  return (
    <div className="flex justify-between items-end">
      <div>
        <span className="text-xl font-semibold block mb-2">Role</span>
        <Breadcrumbs items={itemBreadcrumbs} />
      </div>

      <div>
        <ButtonPrimary className="w-full">Add New Role</ButtonPrimary>
      </div>
    </div>
  );
};

export default UserHeader;
