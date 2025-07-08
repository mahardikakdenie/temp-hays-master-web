'use client';

import DashboardHeader from './components/DashboardHeader';
import DashboardMetrics from './components/DashboardMetrics';
import DashboardMonthlySalesChart from './components/DashboardMonthlySalesChart';
import DashboardMonthlyTarget from './components/DashboardMonthlyTarget';
import DashboardStatistic from './components/DashboardStatistic';

const DashboardView = () => {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <DashboardHeader />
      </div>
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <DashboardMetrics />
        <DashboardMonthlySalesChart />
      </div>
      <div className="col-span-12 xl:col-span-5">
        <DashboardMonthlyTarget />
      </div>
      <div className="col-span-12">
        <DashboardStatistic />
      </div>
    </div>
  );
};

export default DashboardView;
