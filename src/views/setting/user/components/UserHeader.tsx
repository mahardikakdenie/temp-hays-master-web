import type React from 'react';
import { useGlobal } from '@/contexts/global.context';
import PageHeader from '@/components/ui/page/Header';

const UserHeader: React.FC = () => {
  const { onOpenModal } = useGlobal();

  return (
    <PageHeader
      title="User List"
      titleButton="Create new User"
      isShowBtn
      items={[
        { title: 'Setting', href: '#' },
        { title: 'User', href: '#' },
      ]}
      onClick={() => onOpenModal('add')}
    />
  );
};

export default UserHeader;
