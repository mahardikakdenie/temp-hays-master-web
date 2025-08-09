import type React from 'react';
import PageHeader from '@/components/ui/page/Header';
import { useRouter } from 'next/navigation';

const UserHeader: React.FC = () => {
  const itemBreadcrumbs = [
    { title: 'Setting', href: '#' },
    { title: 'Role', href: '/maintaince/role' },
  ];

  const router = useRouter();

  return (
    <PageHeader
      items={itemBreadcrumbs}
      title="Role"
      titleButton="Create new role"
      isShowBtn
      onClick={() => router.push('/maintaince/role/create')}
    />
  );
};

export default UserHeader;
