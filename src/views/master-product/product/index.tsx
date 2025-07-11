'use client';
import ProductHeader from './components/Header';
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
    </div>
  );
};

export default ProductViews;
