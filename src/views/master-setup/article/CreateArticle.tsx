'use client';

import HeaderForm from '@/components/ui/form/HeaderForm';
import PageHeader from '@/components/ui/page/Header';
import { useState } from 'react';
import ArticleForm from './components/ArticleForm';
import useArticleCreateHook from './hooks/useArticleCreate.hook';

const CreateArticleViews: React.FC = () => {
  const [selection, setSeletion] = useState<string>('form-create-article');
  const { form, onSubmit, title, content, image, setTitle, setContent, setImage } =
    useArticleCreateHook();
  const items = [
    { title: 'Master Setup', href: '#' },
    { title: 'Articles', href: '/master-setup/article' },
    {
      title: 'Create Article Form',
      href: '/master-setup/banner',
    },
  ];
  return (
    <div>
      <PageHeader isShowBtn={false} titleButton="" title="Create Article" items={items} />

      <div className="mt-6 mx-auto px-10 py-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <HeaderForm
          headers={['form-create-article']}
          selectedSection={selection}
          setSelectedSection={setSeletion}
        />
        <hr className="my-4 border-slate-700" />

        <ArticleForm
          titleValue={title}
          contentValue={content}
          imageValue={image as File}
          form={form}
          onSubmit={onSubmit}
          handleContent={setContent}
          handleTitle={setTitle}
          handleImage={setImage}
          type="create"
        />
      </div>
    </div>
  );
};

export default CreateArticleViews;
