import PageHeader from '@/components/ui/page/Header';
import { useGlobal } from '@/contexts/global.context';

const ThemeHeader: React.FC = () => {
  const { onOpenModal } = useGlobal();
  return (
    <div>
      <PageHeader
        title="Theme"
        titleButton="Add new Theme"
        onClick={() => onOpenModal('add')}
        items={[
          { title: 'Master product', href: '#' },
          { title: 'Theme', href: '/master-setup/theme' },
        ]}
        isShowBtn
      />
    </div>
  );
};

export default ThemeHeader;
