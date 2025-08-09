'use client';
import PageHeader from '@/components/ui/page/Header';
import RoleMenuSection from './components/RoleMenuSection';

const RoleMenuViews: React.FC = () => {
  const items = [
    { title: 'Setting', href: '#' },
    { title: 'Role Menu', href: '/maintaince/role' },
  ];
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <PageHeader title="Role Menu" titleButton="Create Menu" items={items} isShowBtn={false} />
      </div>
      <div className="col-span-12">
        <RoleMenuSection />
      </div>
    </div>
  );
};

export default RoleMenuViews;
