'use client';

import type React from 'react';
import RoleHeader from './component/RoleHeader';
import RoleTable from './component/RoleTable';

const RoleView: React.FC = () => {
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <RoleHeader />
      </div>
      <div className="col-span-12">
        <RoleTable />
      </div>
    </div>
  );
};

export default RoleView;
