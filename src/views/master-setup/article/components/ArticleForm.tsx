import MediaInput from '@/components/ui/form/MediaInput';
import QuillEditor from '@/components/ui/form/QuillEditor';
import { useEffect, useState } from 'react';

const ArticleForm: React.FC<{
  titleValue: string;
  contentValue: string;
  imageValue: File | string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}> = ({ titleValue, contentValue, imageValue, onSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | string>();

  useEffect(() => {
    setTitle(titleValue);
  }, [titleValue]);
  useEffect(() => {
    setContent(contentValue);
  }, [contentValue]);
  useEffect(() => {
    setImage(imageValue);
  }, [imageValue]);
  const TextLabel: React.FC<{ label: string }> = ({ label }) => {
    return <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>;
  };
  return (
    <div>
      <form action="" id="article-form" className="gap-2" onSubmit={onSubmit}>
        <div>
          <TextLabel label="Title" />
          <QuillEditor value={title} onChange={(title: string) => setTitle(title)} />
        </div>
        <div className="my-4">
          <TextLabel label="Content" />
          <QuillEditor value={content} onChange={(content: string) => setContent(content)} />
        </div>
        <div>
          <MediaInput
            initialPreview={image instanceof File ? URL.createObjectURL(image) : (image as string)}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
