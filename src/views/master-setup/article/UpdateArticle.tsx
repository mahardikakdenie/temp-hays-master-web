'use client';

import HeaderForm from '@/components/ui/form/HeaderForm';
import PageHeader from '@/components/ui/page/Header';
import useArticleUpdateHook from './hooks/useArticleUpdate.hook';

const UpdateArticleViews: React.FC = () => {
  const { selectHeader, setSelectHeader } = useArticleUpdateHook();
  return (
    <div>
      <PageHeader isShowBtn={false} title="Update Article" titleButton="" items={[]} />

      <div className="mt-6 mx-auto px-10 py-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <HeaderForm
          headers={['form-update-article']}
          selectedSection={selectHeader}
          setSelectedSection={setSelectHeader}
        />
        <hr className="my-4 border-slate-700" />
      </div>
    </div>
  );
};

export default UpdateArticleViews;
