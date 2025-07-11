import type React from 'react';
import { useGlobal } from '@/contexts/global.context';
import PageHeader from '@/components/ui/page/Header';

const BannerHeader: React.FC = () => {
  const { onOpenModal } = useGlobal();
  return (
    <PageHeader
      items={[
        { title: 'Master Setup', href: '#' },
        { title: 'Banner', href: '/master-setup/banner' },
      ]}
      onClick={() => onOpenModal('add')}
      isShowBtn
      title="Banner"
      titleButton="Add new banner"
    />
  );
};

export default BannerHeader;
