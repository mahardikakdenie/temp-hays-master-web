import type React from 'react';
import AreaChart from '@/components/ui/charts/Area';
import EllipsisVerticalIcon from '@/components/icons/EllipsisVertical';

const DashboardStatistic: React.FC = () => {
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
      {
        name: 'Sales',
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500)),
      },
    ],
  };

  return (
    <div className="widget-dark px-5 pt-5 sm:px-6 sm:pt-6">
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Statistic</h3>
          <p className="mt-0.5 text-gray-400 text-xs">Target you’ve set for each month</p>
        </div>

        <div className="relative inline-block">
          <button>
            <EllipsisVerticalIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <AreaChart
            height={310}
            colors={['#60A5FA', '#9CB9FF']}
            categories={data.categories}
            series={data.series}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardStatistic;
