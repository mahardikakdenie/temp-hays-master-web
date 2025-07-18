import QuillEditor from '@/components/ui/form/QuillEditor';
import { useState } from 'react';

const ArticleForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const TextLabel: React.FC<{ label: string }> = ({ label }) => {
    return <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>;
  };
  return (
    <div>
      <form action="" id="article-form">
        <div>
          <TextLabel label="Title" />
          <QuillEditor value={title} onChange={(title: string) => setTitle(title)} />
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
