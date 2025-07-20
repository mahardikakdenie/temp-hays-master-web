import PageHeader from '@/components/ui/page/Header';
import { useGlobal } from '@/contexts/global.context';

const SubCategoryHeader: React.FC = () => {
  const { onOpenModal } = useGlobal();
  const items = [
    { title: 'Master product', href: '#' },
    { title: 'Sub Category', href: '/master-setup/category' },
  ];
  return (
    <PageHeader
      isShowBtn
      items={items}
      title="Sub Category"
      titleButton="Add new subcategory"
      onClick={() => onOpenModal('add')}
    />
  );
};

export default SubCategoryHeader;
