import MediaInput from '@/components/ui/form/MediaInput';
import QuillEditor from '@/components/ui/form/QuillEditor';
import { ArticleCreateForm, ArticleUpdateForm } from '@/types/article.types';
import Input from '@/components/ui/form/Input';
import { useEffect, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import Select from '@/components/ui/form/Select';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';

const ArticleForm: React.FC<{
  titleValue: string;
  contentValue: string;
  imageValue: File | string;
  statusValue?: number;
  onSubmit: (data: ArticleCreateForm | ArticleUpdateForm) => void;
  handleTitle: (title: string) => void;
  handleContent: (content: string) => void;
  handleImage: (image: File | null) => void;
  handleStatus?: (status: string | number | null) => void;
  form: UseFormReturn<
    ArticleCreateForm | ArticleUpdateForm,
    unknown,
    ArticleCreateForm | ArticleUpdateForm
  >;
  type: 'create' | 'update';
}> = ({
  titleValue,
  contentValue,
  imageValue,
  statusValue,
  form,
  handleTitle,
  handleStatus,
  handleContent,
  handleImage,
  onSubmit,
  type = 'create',
}) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | string>();
  const isUpdateForm = useMemo(() => type === 'update', [type]);

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
  useEffect(() => {
    if (isUpdateForm) {
      // setStatus(statusValue || null);
    }
  }, [statusValue, isUpdateForm]);

  const TextLabel: React.FC<{ label: string }> = ({ label }) => {
    return (
      <label className="block text-sm font-medium text-gray-300 mb-2 input-label">{label}</label>
    );
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
          <Input
            label="Article Title"
            placeholder="Enter Article Title"
            value={title}
            required
            className="bg-gray-700"
            onChange={(value) => {
              handleTitle(value.target.value);
              setTitle(value.target.value);
            }}
          />
        </div>

        <div className="my-4">
          <div className="mb-2">
            <TextLabel label={`Content`} />
          </div>
          {isUpdateForm ? (
            content !== '' && (
              <QuillEditor
                value={content}
                {...register('content')}
                onChange={(content: string) => {
                  setContent(content);
                  handleContent(content);
                }}
              />
            )
          ) : (
            <QuillEditor
              value={content}
              {...register('content')}
              onChange={(content: string) => {
                setContent(content);
                handleContent(content);
              }}
            />
          )}
          <div>
            <span className="text-sm text-red-500">{errors.content?.message}</span>
          </div>
        </div>
        {isUpdateForm && (
          <div>
            <Select
              label="Status"
              key={form.watch('status')}
              value={form.watch('status')}
              options={[
                { id: 1, name: 'Active' },
                { id: 0, name: 'Non Active' },
              ]}
              {...register('status')}
              onChange={(value) => {
                if (handleStatus) {
                  handleStatus(value as number);
                  form.setValue('status', value as number);
                }
              }}
            />
          </div>
        )}
        <div>
          {isUpdateForm ? (
            image && (
              <MediaInput
                onChange={(file: File | null) => {
                  handleImage(file);
                }}
                initialPreview={
                  image instanceof File ? URL.createObjectURL(image) : (image as string)
                }
              />
            )
          ) : (
            <MediaInput
              onChange={(file: File | null) => {
                handleImage(file);
              }}
              initialPreview={
                image instanceof File ? URL.createObjectURL(image) : (image as string)
              }
            />
          )}
          <div>
            <span className="text-sm text-red-400">{errors.image?.message}</span>
          </div>
        </div>
        <div className="flex justify-end">
          <ButtonPrimary
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
