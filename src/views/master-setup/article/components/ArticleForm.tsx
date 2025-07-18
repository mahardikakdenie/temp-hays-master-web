import MediaInput from '@/components/ui/form/MediaInput';
import QuillEditor from '@/components/ui/form/QuillEditor';
import { ArticleCreateForm } from '@/types/article.types';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

const ArticleForm: React.FC<{
  titleValue: string;
  contentValue: string;
  imageValue: File | string;
  onSubmit: (data: ArticleCreateForm) => void;
  handleTitle: (title: string) => void;
  handleContent: (content: string) => void;
  handleImage: (image: File | null) => void;
  form: UseFormReturn<ArticleCreateForm, unknown, ArticleCreateForm>;
}> = ({
  titleValue,
  contentValue,
  imageValue,
  form,
  handleTitle,
  handleContent,
  handleImage,
  onSubmit,
}) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | string>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
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
      <form
        action=""
        id="article-form"
        className="gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
      >
        <div>
          <TextLabel label="Title" />
          <QuillEditor
            value={title}
            {...register('title')}
            onChange={(title: string) => {
              setTitle(title);
              handleTitle(title);
            }}
          />
          <div>
            <span className="text-sm text-red-400">{errors.title?.message}</span>
          </div>
        </div>
        <div className="my-4">
          <TextLabel label="Content" />
          <QuillEditor
            value={content}
            {...register('content')}
            onChange={(content: string) => {
              setContent(content);
              handleContent(content);
            }}
          />
          <div>
            <span className="text-sm text-red-400">{errors.content?.message}</span>
          </div>
        </div>
        <div>
          <MediaInput
            onChange={(file: File | null) => {
              handleImage(file);
            }}
            initialPreview={image instanceof File ? URL.createObjectURL(image) : (image as string)}
          />
          <div>
            <span className="text-sm text-red-400">{errors.image?.message}</span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
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
