import type React from 'react';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-end">
      <div>
        <span className="text-xl font-semibold block mb-2">Dashboard</span>
        <Breadcrumbs items={[{ title: 'Dashboard', href: '#' }]} />
      </div>
    </div>
  );
};

export default DashboardHeader;
