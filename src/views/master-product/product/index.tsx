'use client';
import ProductHeader from './components/Header';
import ModalUpdateProduct from './components/ModalUpdateProduct';
import ProductTable from './components/Table';

export const ProductViews: React.FC = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 mb-4">
        <ProductHeader />
      </div>
      <div className="col-span-12">
        <ProductTable />
      </div>
      <ModalUpdateProduct />
    </div>
  );
};

export default ProductViews;
