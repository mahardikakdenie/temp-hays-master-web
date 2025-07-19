import type React from 'react';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import { useRouter } from 'next/navigation';

const ArticleHeader: React.FC = () => {
  const router = useRouter();
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
        <ButtonPrimary
          className="w-full"
          onClick={() => router.push(`/master-setup/article/create`)}
        >
          Add New Article
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default ArticleHeader;
