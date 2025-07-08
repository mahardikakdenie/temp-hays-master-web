import type React from 'react';
import CountUp from 'react-countup';
import Badge from '@/components/ui/badge/Badge';
import RadialBarChart from '@/components/ui/charts/RadialBar';
import ChevronDownIcon from '@/components/icons/ChevronDown';
import EllipsisVerticalIcon from '@/components/icons/EllipsisVertical';

const DashboardMonthlyTarget: React.FC = () => {
  const labels = ['Progress'];
  const data = {
    labels,
    series: [72.25],
  };

  return (
    <div className="widget-dark">
      <div className="bg-ui-800 rounded-2xl px-5 pt-5 pb-8 sm:px-6 sm:pt-6">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Monthly Target</h3>
            <p className="mt-0.5 text-gray-400 text-xs">Target you’ve set for each month</p>
          </div>

          <div className="relative inline-block">
            <button>
              <EllipsisVerticalIcon className="h-6 w-6 text-white/90" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="max-h-[330px]">
            <RadialBarChart
              height={330}
              colors={['#60a5fa']}
              labels={data.labels}
              series={data.series}
            />
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-[95%]">
            <Badge color="success" size="sm">
              +10%
            </Badge>
          </div>
        </div>
        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-xs sm:text-sm text-gray-400">
          You earn $3287 today, it&apos;s higher than last month. Keep up your good work!
        </p>
      </div>

      <div className="flex items-center justify-center px-6 py-3.5 gap-5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-400 text-xs sm:text-sm">Target</p>
          <p className="flex items-center justify-center gap-2 text-base font-semibold sm:text-lg">
            <CountUp prefix="$" end={70} duration={1.5} />
            <ChevronDownIcon className="h-4 w-4 text-red-500" />
          </p>
        </div>

        <div className="w-px h-7 bg-gray-600"></div>

        <div>
          <p className="mb-1 text-center text-gray-400 text-xs sm:text-sm">Revenue</p>
          <p className="flex items-center justify-center gap-2 text-base font-semibold sm:text-lg">
            <CountUp prefix="$" end={100} duration={1.5} />
            <ChevronDownIcon className="h-4 w-4 text-green-500 rotate-180" />
          </p>
        </div>

        <div className="w-px h-7 bg-gray-600"></div>

        <div>
          <p className="mb-1 text-center text-gray-400 text-xs sm:text-sm">Today</p>
          <p className="flex items-center justify-center gap-2 text-base font-semibold sm:text-lg">
            <CountUp prefix="$" end={20} duration={1.5} />
            <ChevronDownIcon className="h-4 w-4 text-red-500" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMonthlyTarget;
