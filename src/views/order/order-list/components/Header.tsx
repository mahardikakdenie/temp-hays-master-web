import PageHeader from '@/components/ui/page/Header';

const OrderListHeader: React.FC = () => {
  return (
    <div>
      <PageHeader
        items={[]}
        onClick={() => {}}
        title="Order List"
        isShowBtn
        titleButton="Add new Order"
      />
    </div>
  );
};

export default OrderListHeader;
