'use client';
import type React from 'react';
import PageHeader from '@/components/ui/page/Header';
import { useRouter } from 'next/navigation';

const BannerHeader: React.FC = () => {
  const router = useRouter();
  return (
    <PageHeader
      items={[
        { title: 'Master Setup', href: '#' },
        { title: 'Banner', href: '/master-setup/banner' },
      ]}
      isShowBtn
      title="Banner"
      titleButton="Add new banner"
      onClick={() => router.push('/master-setup/banner/create')}
    />
  );
};

export default BannerHeader;
