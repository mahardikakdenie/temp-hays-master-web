import Modal from '@/components/ui/modal/Modal';
import useCreateExhibitionHook from '../hooks/useCreateExhibition.hook';
import Select from '@/components/ui/form/Select';
import Input from '@/components/ui/form/Input';
import ActionModal from '@/components/ui/modal/ActionModal';
import DatePicker from '@/components/ui/form/DatePicker';
import QuillEditor from '@/components/ui/form/QuillEditor';
import MediaInput from '@/components/ui/form/MediaInput';

const ModalCreateExhibition: React.FC = () => {
  const { artistOptions, form, onCancel, onSubmit } = useCreateExhibitionHook();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = form;
  const FORMID = 'create-exhibition-form';
  return (
    <Modal
      name="add"
      title="Create Exhibition"
      action={<ActionModal isSubmitting={isSubmitting} formId={FORMID} onCancel={onCancel} />}
    >
      <form id={FORMID} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4">
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
          <div className="mt-4 col-span-12">
            <Input
              label="Name"
              placeholder="Enter Exhibition Name"
              {...register('name')}
              error={errors.name?.message}
            />
          </div>
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
        <div className="my-4">
          <QuillEditor
            value={form.watch('desc')}
            onChange={(content) => form.setValue('desc', content)}
            className="bg-[#1b1d20]"
          />
        </div>
        <div className="my-4">
          <MediaInput
            label="Artist Image"
            onChange={(file: File | null) => {
              form.setValue('image', file as File);
            }}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreateExhibition;
