'use client';

import HeaderForm from '@/components/ui/form/HeaderForm';
import PageHeader from '@/components/ui/page/Header';
import { useState } from 'react';
import ArticleForm from './components/ArticleForm';

const CreateArticleViews: React.FC = () => {
  const [selection, setSeletion] = useState<string>('form-create-article');
  return (
    <div>
      <PageHeader isShowBtn={false} titleButton="" title="Create Article" items={[]} />

      <div className="mt-6 mx-auto px-10 py-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <HeaderForm
          headers={['form-create-article']}
          selectedSection={selection}
          setSelectedSection={setSeletion}
        />
        <hr className="my-4 border-slate-700" />

        <ArticleForm
          titleValue={''}
          contentValue={''}
          imageValue={''}
          onSubmit={function (event: React.FormEvent<HTMLFormElement>): void {
            console.log(event);
          }}
        />
      </div>
    </div>
  );
};

export default CreateArticleViews;
