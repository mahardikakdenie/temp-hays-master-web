import type React from 'react';
import PageHeader from '@/components/ui/page/Header';

const UserHeader: React.FC = () => {
  const itemBreadcrumbs = [
    { title: 'Setting', href: '#' },
    { title: 'Role', href: '/maintaince/role' },
  ];
  return (
    <PageHeader items={itemBreadcrumbs} title="Role" titleButton="Create new role" isShowBtn />
  );
};

export default UserHeader;
