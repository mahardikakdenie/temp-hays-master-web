'use client';

import CategoryHeader from './components/CategoryHeader';
import CategoryTable from './components/CategoryTable';
import ModalCreateCategory from './components/ModalCreateCategory';
import ModalUpdateCategory from './components/ModalUpdateCategory';

const CategoryViews: React.FC = () => {
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <CategoryHeader />
      </div>

      <div className="col-span-12">
        <CategoryTable />
      </div>
      <ModalCreateCategory />
      <ModalUpdateCategory />
    </div>
  );
};

export default CategoryViews;
