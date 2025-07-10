'use client';
import React from 'react';
import FieldCategoryHeader from './components/Header';

const FieldCategoryViews: React.FC = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <FieldCategoryHeader />
      </div>
    </div>
  );
};

export default FieldCategoryViews;
