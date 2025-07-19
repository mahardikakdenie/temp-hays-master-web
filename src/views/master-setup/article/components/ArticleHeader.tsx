'use client';
import type React from 'react';
import PageHeader from '@/components/ui/page/Header';

const ArticleHeader: React.FC = () => {
  return (
    <PageHeader
      items={[
        { title: 'Master Setup', href: '#' },
        { title: 'Articles', href: '/master-setup/article' },
      ]}
      isShowBtn
      title="Articles"
      titleButton="Add new Article"
    />
  );
};

export default ArticleHeader;
