'use client';
import OrderListHeader from './components/Header';
import ModalCreateOrder from './components/ModalCreateOrder';
import OrderListTable from './components/Table';

const OrderListViews: React.FC = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 mb-4">
        <OrderListHeader />
      </div>
      <div className="col-span-12">
        <OrderListTable />
      </div>
      <ModalCreateOrder />
    </div>
  );
};

export default OrderListViews;
