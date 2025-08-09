import PencilSquareIcon from '@/components/icons/PencilSquare';
import { cn } from '@/libs/utils/cn.utils';
import { Button } from '@headlessui/react';
import { useState } from 'react';
import useRoleMenuHook from '../hooks/useRoleMenu.hook';

const RoleMenuSection: React.FC = () => {
  const headerList = [
    {
      key: 'cms',
      name: 'CMS',
    },
    {
      key: 'landing-page',
      name: 'Landing page',
    },
  ];

  const [selectedType, setSelectedType] = useState<string>('cms');
  const { data } = useRoleMenuHook();
  return (
    <div className="mt-6 mx-auto px-10 py-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <div className="mb-4">
        <div>
          <span>List Menu</span>
        </div>
      </div>
      <hr className="border border-slate-500 mb-5" />

      <div className="flex gap-2 justify-start">
        {headerList.map((item, index) => {
          return (
            <Button
              onClick={() => setSelectedType(item.key)}
              key={index}
              className={cn(
                'px-4 py-2',
                selectedType === item.key ? 'bg-gray-700 rounded-2xl' : '',
              )}
            >
              <span className="text-sm ">{item.name}</span>
            </Button>
          );
        })}
      </div>

      <div className="mt-4">
        <div className="border border-ui-600 px-4 rounded-xl py-7">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-4 p-4 border border-ui-600 rounded-xl">
              {data?.map((item) => {
                return (
                  <div key={item.id} className="rounded-xl bg-gray-700 flex justify-between mb-4">
                    <div className="py-3 px-2">
                      <span>{item.name}</span>
                    </div>
                    <div className="py-3 px-2">
                      <PencilSquareIcon className="w-6 h-6 cursor-pointer" />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-span-12 sm:col-span-8 p-4 border border-ui-600 rounded-xl">
              halo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleMenuSection;
