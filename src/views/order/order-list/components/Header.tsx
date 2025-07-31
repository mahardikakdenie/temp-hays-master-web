import PageHeader from '@/components/ui/page/Header';
import { useGlobal } from '@/contexts/global.context';

const OrderListHeader: React.FC = () => {
  const { onOpenModal } = useGlobal();
  return (
    <div>
      <PageHeader
        items={[]}
        onClick={() => onOpenModal('add')}
        title="Order List"
        isShowBtn
        titleButton="Add new Order"
      />
    </div>
  );
};

export default OrderListHeader;
