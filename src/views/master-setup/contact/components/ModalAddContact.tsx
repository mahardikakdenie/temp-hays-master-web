'use client';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import Modal from '@/components/ui/modal/Modal';
import useAddContact from '../hooks/useCreateContact.hook';
import Textarea from '@/components/ui/form/Textarea';

const ButtonActions: React.FC<{
  onCancel: () => void;
  isSubmitting: boolean;
}> = ({ onCancel, isSubmitting }) => {
  return (
    <div className="flex gap-4">
      <ButtonSecondary onClick={onCancel}>Cancel</ButtonSecondary>
      <ButtonPrimary
        type="submit"
        form="add-contact-form"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Submit
      </ButtonPrimary>
    </div>
  );
};
const ModalAddContact: React.FC = () => {
  const { onCancel, form, onSubmit } = useAddContact();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = form;
  return (
    <Modal
      name="add"
      title="Add Contact"
      action={<ButtonActions isSubmitting={isSubmitting} onCancel={onCancel} />}
      onClose={onCancel}
    >
      <form action="" id="add-contact-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Input
              label="Name"
              placeholder="Enter Contact Name"
              required
              error={errors.name?.message}
              {...register('name')}
            />
          </div>
          <div className="col-span-12">
            <Input
              id="email"
              label="Email"
              placeholder="Enter your email"
              error={errors.email?.message}
              required
              {...register('email')}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="phone"
              label="Phone"
              placeholder="Enter your phone"
              inputMode="numeric"
              error={errors.phone?.message}
              required
              {...register('phone')}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="wa_phone"
              label="Wa Phone"
              placeholder="Enter Wa Phone"
              required
              error={errors.wa_phone?.message}
              {...register('wa_phone')}
            />
          </div>
          <div className="col-span-12">
            <Textarea
              label="Location"
              placeholder="Enter Contact Location.."
              required
              error={errors.location?.message}
              {...register('location')}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              label="Latitude"
              placeholder="Enter Latitude"
              required
              error={errors.lat?.message}
              {...register('lat')}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              label="Longitude"
              placeholder="Enter Longitude"
              required
              error={errors.lng?.message}
              {...register('lng')}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddContact;
