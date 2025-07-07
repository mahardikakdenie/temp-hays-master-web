import type React from 'react';
import BarChart from '@/components/ui/charts/Bar';
import EllipsisVerticalIcon from '@/components/icons/EllipsisVertical';

const DashboardMonthlySalesChart: React.FC = () => {
  const categories = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const data = {
    categories,
    series: [
      {
        name: 'Sales',
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500)),
      },
    ],
  };

  return (
    <div className="overflow-hidden widget-dark px-5 pt-5 sm:px-6 sm:pt-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">Monthly Sales</h3>
        </div>

        <div className="relative inline-block">
          <button>
            <EllipsisVerticalIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[650px] xl:min-w-full">
          <BarChart
            height={180}
            colors={['#60A5FA']}
            categories={data.categories}
            series={data.series}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardMonthlySalesChart;
