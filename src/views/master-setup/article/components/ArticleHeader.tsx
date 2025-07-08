import type React from 'react';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';

const ArticleHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-end">
      <div>
        <span className="text-xl font-semibold block mb-2">Article</span>
        <Breadcrumbs
          items={[
            { title: 'Master Setup', href: '#' },
            { title: 'Article', href: '/master-setup/article' },
          ]}
        />
      </div>

      <div>
        <ButtonPrimary className="w-full">Add New Article</ButtonPrimary>
      </div>
    </div>
  );
};

export default ArticleHeader;
