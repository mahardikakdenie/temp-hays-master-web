import type React from 'react';
import type { Options } from '@/types/commons.types';
import { Controller } from 'react-hook-form';
import Modal from '@/components/ui/modal/Modal';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import Select from '@/components/ui/form/Select';
import useAddUser from '../hooks/useAddUser.hook';

type ModalAddUserProps = {
  accessOptions: Options[];
};

const ModalAddUser: React.FC<ModalAddUserProps> = ({ accessOptions }) => {
  const { form, onSubmit, onCancel } = useAddUser();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <Modal
      name="add"
      title="Add New User"
      action={
        <div className="flex gap-4">
          <ButtonSecondary onClick={onCancel}>Cancel</ButtonSecondary>
          <ButtonPrimary
            type="submit"
            form="add-user-form"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Submit
          </ButtonPrimary>
        </div>
      }
      onClose={onCancel}
    >
      <form id="add-user-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Controller
              name="access_id"
              control={control}
              render={({ field }) => (
                <Select
                  id="access_id"
                  label="Access"
                  placeholder="Choose Access"
                  value={field.value}
                  onChange={field.onChange}
                  options={accessOptions}
                  error={errors.access_id?.message}
                  required
                />
              )}
            />
          </div>
          <div className="col-span-12">
            <Input
              id="fullname"
              label="Fullname"
              placeholder="Enter your fullname"
              error={errors.fullname?.message}
              required
              {...register('fullname')}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
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
              id="username"
              label="Username"
              placeholder="Enter your username"
              error={errors.username?.message}
              required
              {...register('username')}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              autoComplete="off"
              required
              {...register('password')}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddUser;
