'use client';
import type React from 'react';
import PageHeader from '@/components/ui/page/Header';

const BannerHeader: React.FC = () => {
  return (
    <PageHeader
      items={[
        { title: 'Master Setup', href: '#' },
        { title: 'Banner', href: '/master-setup/banner' },
      ]}
      isShowBtn
      title="Banner"
      titleButton="Add new banner"
    />
  );
};

export default BannerHeader;
