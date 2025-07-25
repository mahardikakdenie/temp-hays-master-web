'use client';
import type React from 'react';
import PageHeader from '@/components/ui/page/Header';
import { useRouter } from 'next/navigation';

const ArticleHeader: React.FC = () => {
  const router = useRouter();
  return (
    <PageHeader
      items={[
        { title: 'Master Setup', href: '#' },
        { title: 'Articles', href: '/master-setup/article' },
      ]}
      isShowBtn
      title="Articles"
      titleButton="Add new Article"
      onClick={() => router.push('/master/article/create')}
    />
  );
};

export default ArticleHeader;
