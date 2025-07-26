// ModalUpdateExhibition.tsx
import Modal from '@/components/ui/modal/Modal';
import Select from '@/components/ui/form/Select';
import Input from '@/components/ui/form/Input';
import ActionModal from '@/components/ui/modal/ActionModal';
import DatePicker from '@/components/ui/form/DatePicker';
import QuillEditor from '@/components/ui/form/QuillEditor';
import MediaInput from '@/components/ui/form/MediaInput';
import useUpdateExhibitionHook from '../hooks/useUpdateExhibition';
import LoadingIcon from '@/components/icons/Loading';

const ModalUpdateExhibition: React.FC = () => {
  const { artistOptions, previewImg, form, onCancel, onSubmit, isLoading } =
    useUpdateExhibitionHook();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = form;

  const FORMID = 'update-exhibition-form';

  return (
    <Modal
      name="detail"
      title="Update Exhibition"
      action={<ActionModal isSubmitting={isSubmitting} formId={FORMID} onCancel={onCancel} />}
    >
      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingIcon className="w-6 h-6 text-white/90 animate-spin" />
        </div>
      ) : (
        <form id={FORMID} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-12 gap-4">
            {/* Artist */}
            <div className="col-span-12">
              <Select
                label="Artist Name"
                placeholder="Select Artist Name"
                className="bg-[#1b1d20]"
                required
                value={form.watch('artist_id')}
                options={artistOptions}
                error={errors.artist_id?.message}
                onChange={(value) => {
                  form.setValue('artist_id', value as number);
                }}
              />
            </div>

            {/* Name */}
            <div className="col-span-12">
              <Input
                label="Name"
                placeholder="Enter Exhibition Name"
                {...register('name')}
                error={errors.name?.message}
              />
            </div>

            {/* Dates */}
            <div className="col-span-12 sm:col-span-6">
              <DatePicker
                id="startDate"
                label="Start Date"
                value={form.watch('start_date')}
                onChange={(date) => form.setValue('start_date', date)}
                placeholder="Choose Start Date"
              />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <DatePicker
                id="endDate"
                label="End Date"
                value={form.watch('end_date')}
                minDate={form.watch('start_date')}
                onChange={(date) => form.setValue('end_date', date)}
                placeholder="Choose End Date"
              />
            </div>
          </div>

          {/* Description */}
          <div className="my-4">
            <QuillEditor
              key={form.watch('id')}
              label="Description"
              value={form.watch('desc') ?? ''} // ✅ Selalu string
              onChange={(content) => form.setValue('desc', content)}
              className="bg-[#1b1d20]"
              placeholder="Write exhibition details here..."
              required
              error={errors.desc?.message}
            />
          </div>

          {/* Image */}
          <div className="my-4">
            <MediaInput
              key={previewImg}
              initialPreview={previewImg}
              label="Exhibition Image"
              onChange={(file: File | null) => {
                form.setValue('image', file as File);
                form.setValue('is_update_image', file !== null);
              }}
            />
          </div>
        </form>
      )}
    </Modal>
  );
};

export default ModalUpdateExhibition;
