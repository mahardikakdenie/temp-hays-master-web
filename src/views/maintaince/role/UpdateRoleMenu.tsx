'use client';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import Textarea from '@/components/ui/form/Textarea';
import PageHeader from '@/components/ui/page/Header';
import PermissionTable from './component/rolePermission';
import useUpdateRole from './hooks/useUpdateRole.hook';
import Select from '@/components/ui/form/Select';

const items = [
  { title: 'Maintaince', href: '#' },
  { title: 'Role', href: '/maintaince/role' },
  {
    title: 'Update Role Form',
    href: '/master-setup/banner',
  },
];

const UpdateRoleFormViews: React.FC = () => {
  const FORM_ID = 'update-role';
  const { form, isLoading: dataLoading, selected, submit } = useUpdateRole();
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = form;

  return (
    <div>
      <PageHeader items={items} title="Create Role" isShowBtn={false} titleButton="" />

      <div className="mt-6 mx-auto px-10 py-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="mb-4">
          <div>
            <span>Update Role</span>
          </div>
        </div>
        <hr className="my-4 border border-gray-600" />
        <form id={FORM_ID} onSubmit={handleSubmit(submit)}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <Input
                label="Name Role"
                placeholder="Contoh : Superadmin"
                className="bg-gray-700"
                required
                error={errors.name?.message}
                {...register('name')}
              />
            </div>
            <div className="col-span-12">
              <Textarea
                label="Name Role"
                placeholder="Contoh : User ini biasanya digunakan untuk page admin atau page landing page"
                className="bg-gray-700"
                required
                error={errors.desc?.message}
                {...register('desc')}
              />
            </div>
            <div className="col-span-12">
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
                  form.setValue('status', value as number);
                }}
              />
            </div>
            <div className="col-span-12 p-3">
              <PermissionTable
                initialSelected={selected}
                isLoading={dataLoading}
                onSelectedPermission={(permission) => {
                  // setSelected((prev) => [...prev, ...permission]);

                  form.setValue('actions', permission);
                }}
              />
              <div>
                <span className="text-red-500 text-sm">{errors.actions?.message}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-5">
            <ButtonSecondary>Back</ButtonSecondary>
            <ButtonPrimary
              id={FORM_ID}
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Update Role
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoleFormViews;
