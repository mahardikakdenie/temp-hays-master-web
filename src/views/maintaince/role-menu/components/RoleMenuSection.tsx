import PencilSquareIcon from '@/components/icons/PencilSquare';
import { cn } from '@/libs/utils/cn.utils';
import { Button } from '@headlessui/react';
import useRoleMenuHook from '../hooks/useRoleMenu.hook';

const RoleMenuSection: React.FC = () => {
  const {
    data,
    selectedMenu,
    handlingSelectMenu,
    selectedType,
    setSelectedType,
    headerList,
    onOpenModal,
  } = useRoleMenuHook();
  return (
    <div className="mt-6 mx-auto px-10 py-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <div className="mb-4">
        <div>
          <span>List Menu</span>
        </div>
      </div>
      <hr className="border border-slate-700 mb-5" />

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
                  <div
                    onClick={() => handlingSelectMenu(item)}
                    key={item.id}
                    className={cn(
                      'rounded-xl flex justify-between mb-4 cursor-pointer hover:bg-gray-700',
                      selectedMenu?.id === item.id && 'bg-gray-700 ',
                    )}
                  >
                    <div className="py-3 px-5">
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <div className="py-4 px-2 flex justify-center items-center">
                      <button onClick={() => onOpenModal('detail', item)}>
                        <PencilSquareIcon className="w-4 h-4 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-span-12 sm:col-span-8 p-4 border border-ui-600 rounded-xl">
              {selectedMenu && selectedMenu.child.length > 0 ? (
                selectedMenu?.child.map((child) => {
                  return (
                    <div
                      key={child.id}
                      className={cn('rounded-xl flex justify-between mb-4', 'bg-gray-700 ')}
                    >
                      <div className="py-3 px-5">
                        <span className="text-sm">{child.name}</span>
                      </div>
                      <div className="py-4 px-2 flex justify-center items-center">
                        <button onClick={() => onOpenModal('detail', child)}>
                          <PencilSquareIcon className="w-4 h-4 cursor-pointer" />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex justify-center p-7">
                  <div className="">Tidak Ada Sub Menu</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleMenuSection;
