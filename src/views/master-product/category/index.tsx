'use client';

import CategoryHeader from './components/CategoryHeader';
import CategoryTable from './components/CategoryTable';

const CategoryViews: React.FC = () => {
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <CategoryHeader />
      </div>

      <div className="col-span-12">
        <CategoryTable />
      </div>
    </div>
  );
};

export default CategoryViews;
