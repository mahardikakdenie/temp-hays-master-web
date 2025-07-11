'use client';

import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Modal from '@/components/ui/modal/Modal';
import QuillEditor from '@/components/ui/form/QuillEditor';
import { useState } from 'react';
import useAddBanner from '../useAddBanner.hook';

const ModalAddBanner: React.FC = () => {
  const { onCancel } = useAddBanner();
  const [content, setContent] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi sederhana: cek apakah konten kosong
    if (!content.trim()) {
      setIsEmpty(true);
      return;
    }

    setIsEmpty(false);
    setIsSubmitting(true);

    // Kirim data ke backend atau context
    // onSubmit({ content }).finally(() => {
    //   setIsSubmitting(false);
    // });
  };

  return (
    <Modal
      name="add"
      title="Add New Banner"
      action={
        <div className="flex gap-4">
          <ButtonSecondary onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </ButtonSecondary>
          <ButtonPrimary
            type="submit"
            form="banner-form"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Submit
          </ButtonPrimary>
        </div>
      }
      onClose={onCancel}
    >
      <form id="banner-form" onSubmit={handleFormSubmit} className="space-y-4">
        <div className="form-control">
          <label htmlFor="quill-editor" className="block text-sm font-medium mb-2">
            Banner Content
          </label>
          <QuillEditor value={content} onChange={setContent} />
          {isEmpty && <p className="text-red-500 text-sm mt-1">Content cannot be empty.</p>}
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddBanner;
