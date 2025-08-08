import type React from 'react';
import PageHeader from '@/components/ui/page/Header';
import { useGlobal } from '@/contexts/global.context';

const UserHeader: React.FC = () => {
  const itemBreadcrumbs = [
    { title: 'Setting', href: '#' },
    { title: 'Role', href: '/maintaince/role' },
  ];

  const { onOpenModal } = useGlobal();

  return (
    <PageHeader
      items={itemBreadcrumbs}
      title="Role"
      titleButton="Create new role"
      isShowBtn
      onClick={() => onOpenModal('add')}
    />
  );
};

export default UserHeader;
