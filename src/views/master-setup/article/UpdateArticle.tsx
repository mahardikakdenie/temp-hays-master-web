'use client';

import HeaderForm from '@/components/ui/form/HeaderForm';
import PageHeader from '@/components/ui/page/Header';
import useArticleUpdateHook from './hooks/useArticleUpdate.hook';
import ArticleForm from './components/ArticleForm';
import { ArticleCreateForm, ArticleUpdateForm } from '@/types/article.types';
import { UseFormReturn } from 'react-hook-form';

const UpdateArticleViews: React.FC = () => {
  const {
    selectHeader,
    setSelectHeader,
    title,
    status,
    content,
    image,
    form,
    onSubmit,
    setContent,
    setTitle,
    setImage,
    setStatus,
  } = useArticleUpdateHook();
  type formType = UseFormReturn<
    ArticleUpdateForm | ArticleCreateForm,
    unknown,
    ArticleUpdateForm | ArticleCreateForm
  >;
  type submitType = (data: ArticleCreateForm | ArticleUpdateForm) => void;

  const items = [
    { title: 'Master Setup', href: '#' },
    { title: 'Articles', href: '/master-setup/article' },
    {
      title: 'Update Article Form',
      href: '/master-setup/banner',
    },
  ];
  return (
    <div>
      <PageHeader isShowBtn={false} title="Update Article" titleButton="" items={items} />

      <div className="mt-6 mx-auto px-10 py-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <HeaderForm
          headers={['form-update-article']}
          selectedSection={selectHeader}
          setSelectedSection={setSelectHeader}
        />
        <hr className="my-4 border-slate-700" />

        <ArticleForm
          type="update"
          titleValue={title}
          contentValue={content}
          imageValue={image as string}
          statusValue={status as number}
          form={form as formType}
          handleContent={setContent}
          handleTitle={setTitle}
          handleImage={setImage}
          handleStatus={setStatus}
          onSubmit={onSubmit as submitType}
        />
      </div>
    </div>
  );
};

export default UpdateArticleViews;
