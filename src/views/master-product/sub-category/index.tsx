'use client';
import SubCategoryHeader from './components/Header';
import SubCategoryTable from './components/Table';

const SubCategoryViews = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <SubCategoryHeader />
      </div>
      <div className="col-span-12">
        <SubCategoryTable />
      </div>
    </div>
  );
};

export default SubCategoryViews;
