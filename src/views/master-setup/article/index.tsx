'use client';

import React from 'react';
import ArticleHeader from './components/ArticleHeader';
import ArticleTable from './components/ArticleTable';

const ArticleViews: React.FC = () => {
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <ArticleHeader />
      </div>
      <div className="col-span-12">
        <ArticleTable />
      </div>
    </div>
  );
};

export default ArticleViews;
