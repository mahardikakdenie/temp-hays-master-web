import type React from 'react';
import ShoppingCartIcon from '@/components/icons/ShoppingCart';
import SparklineChart from '@/components/ui/charts/Sprarkline';
import CountUp from 'react-countup';
import BankNotesIcon from '@/components/icons/BankNotes';

const DashboardMetrics: React.FC = () => {
  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const data = {
    categories,
    series: [
      {
        name: 'Income',
        data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 50)),
      },
    ],
    series2: [
      {
        name: 'Transaction',
        data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 50)),
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      <div className="widget-dark p-5 md:p-6">
        <div className="flex justify-between">
          <div>
            <div className="mb-8">
              <BankNotesIcon className="h-6 w-6" />
            </div>

            <div>
              <span className="text-sm text-gray-400">Income</span>
              <CountUp
                prefix="$"
                end={10980}
                duration={1.5}
                className="block mt-2 font-semibold text-3xl"
              />
            </div>
          </div>

          <div className="flex items-center">
            <SparklineChart
              height={50}
              width={150}
              colors={['#60a5fa']}
              categories={data.categories}
              series={data.series}
            />
          </div>
        </div>
      </div>

      <div className="widget-dark p-5 md:p-6">
        <div className="flex justify-between">
          <div>
            <div className="mb-8">
              <ShoppingCartIcon className="h-6 w-6" />
            </div>

            <div>
              <span className="text-sm text-gray-400">Transaction</span>
              <CountUp end={3782} duration={1.5} className="block mt-2 font-semibold text-3xl" />
            </div>
          </div>

          <div className="flex items-center">
            <SparklineChart
              height={50}
              width={150}
              colors={['#a78bfa']}
              categories={data.categories}
              series={data.series2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMetrics;
