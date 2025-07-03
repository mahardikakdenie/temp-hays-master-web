'use client';

import type React from 'react';
import BannerHeader from './components/bannerHeader';
import BannerTable from './components/bannerTable';

const BannerView: React.FC = () => {
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <BannerHeader />
      </div>
      <div className="col-span-12">
        <BannerTable />
      </div>
    </div>
  );
};

export default BannerView;
