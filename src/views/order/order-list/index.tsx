'use client';
import OrderListHeader from './components/Header';
import OrderListTable from './components/Table';

const OrderListViews: React.FC = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <OrderListHeader />
      </div>
      <div className="col-span-12">
        <OrderListTable />
      </div>
    </div>
  );
};

export default OrderListViews;
