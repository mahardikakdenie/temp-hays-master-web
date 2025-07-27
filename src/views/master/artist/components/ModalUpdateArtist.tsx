import Input from '@/components/ui/form/Input';
import Modal from '@/components/ui/modal/Modal';
import ActionModal from '@/components/ui/modal/ActionModal';
import QuillEditor from '@/components/ui/form/QuillEditor';
import MediaInput from '@/components/ui/form/MediaInput';
import useUpdateArtistHook from '../hooks/useUpdateArtist.hook';
import { Key } from 'react';
import Select from '@/components/ui/form/Select';

const ModalUpdateArtist: React.FC = () => {
  const { form, onCancel, onSubmit, preview } = useUpdateArtistHook();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = form;

  const FORMID = 'update-artist-form';
  return (
    <Modal
      name="detail"
      title="Update Artist"
      onClose={onCancel}
      action={<ActionModal isSubmitting={isSubmitting} onCancel={onCancel} formId={FORMID} />}
    >
      <form id={FORMID} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Input
              label="Name"
              placeholder="Enter Artist Name"
              required
              {...register('name')}
              error={errors.name?.message}
            />
          </div>
          <div className="col-span-12">
            <Input
              label="Email"
              placeholder="Enter Artist Email"
              required
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
          </div>
          <div className="col-span-12">
            <Input
              label="Phone"
              placeholder="Enter Artist Phone"
              required
              type="text"
              inputMode="numeric"
              {...register('phone')}
              error={errors.phone?.message}
            />
          </div>
          <div className="col-span-12">
            <Select
              label="Status"
              value={form.watch('status')}
              className="bg-[#1b1d20]"
              options={[
                { id: 1, name: 'Active' },
                { id: 0, name: 'Non Active' },
              ]}
              {...register('status')}
              onChange={(value) => {
                form.setValue('status', value as number);
              }}
            />
            <p className="mt-1 text-xs text-gray-400">Choose Status for Artist</p>
          </div>
        </div>
        <div className="my-4">
          <QuillEditor
            key={form.watch('desc')}
            label="Decription"
            value={form.watch('desc')}
            onChange={(content: string) => {
              form.setValue('desc', content);
            }}
            className="bg-[#1b1d20]"
            error={errors.desc?.message}
            required
          />
        </div>
        <div className="my-4">
          <MediaInput
            key={preview as Key}
            initialPreview={preview as string}
            label="Artist Image"
            onChange={(file: File | null) => {
              form.setValue('image', file as File);
              form.setValue('is_update_image', true);
            }}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ModalUpdateArtist;
