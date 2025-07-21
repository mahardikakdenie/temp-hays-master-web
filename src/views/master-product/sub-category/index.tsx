'use client';
import SubCategoryHeader from './components/Header';
import ModalCreateSubCategory from './components/ModalCreate';
import ModalUpdateSubCategory from './components/ModalUpdate';
import SubCategoryTable from './components/Table';

const SubCategoryViews = () => {
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <SubCategoryHeader />
      </div>
      <div className="col-span-12">
        <SubCategoryTable />
      </div>
      <ModalCreateSubCategory />
      <ModalUpdateSubCategory />
    </div>
  );
};

export default SubCategoryViews;
