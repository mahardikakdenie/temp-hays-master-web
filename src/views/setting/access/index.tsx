'use client';

import type React from 'react';
import AccessHeader from './components/AccessHeader';

const AccessView: React.FC = () => {
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <AccessHeader />
      </div>
      <div className="col-span-12"></div>
    </div>
  );
};

export default AccessView;
