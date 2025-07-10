import PageHeader from '@/components/ui/page/Header';

const themeHeader: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Theme"
        titleButton="Add new Theme"
        onClick={() => {}}
        items={[
          { title: 'Master product', href: '#' },
          { title: 'Category', href: '/master-setup/category' },
        ]}
        isShowBtn
      />
    </div>
  );
};

export default themeHeader;
