'use client';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import Textarea from '@/components/ui/form/Textarea';
import PageHeader from '@/components/ui/page/Header';
import PermissionTable from './component/rolePermission';

const items = [
  { title: 'Master Setup', href: '#' },
  { title: 'Articles', href: '/master-setup/article' },
  {
    title: 'Create Article Form',
    href: '/master-setup/banner',
  },
];
const CreateRoleFormViews: React.FC = () => {
  return (
    <div>
      <PageHeader items={items} title="Create Role" isShowBtn={false} titleButton="" />

      <div className="mt-6 mx-auto px-10 py-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="mb-4">
          <div>
            <span>Create Role</span>
          </div>
        </div>
        <hr className="my-4 border border-gray-600" />
        <form>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <Input
                label="Name Role"
                placeholder="Contoh : Superadmin"
                className="bg-gray-700"
                required
              />
            </div>
            <div className="col-span-12">
              <Textarea
                label="Name Role"
                placeholder="Contoh : User ini biasanya digunakan untuk page admin atau page landing page"
                className="bg-gray-700"
                required
              />
            </div>
            <div className="col-span-12 p-3">
              <PermissionTable
                onSelectedPermission={(permission) => {
                  console.log('permission parent : ', permission);
                }}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-5">
            <ButtonSecondary>Back</ButtonSecondary>
            <ButtonPrimary type="submit">Create Role</ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoleFormViews;
