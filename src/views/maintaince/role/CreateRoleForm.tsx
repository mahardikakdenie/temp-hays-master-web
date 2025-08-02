'use client';
import PageHeader from '@/components/ui/page/Header';

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
        <form></form>
      </div>
    </div>
  );
};

export default CreateRoleFormViews;
