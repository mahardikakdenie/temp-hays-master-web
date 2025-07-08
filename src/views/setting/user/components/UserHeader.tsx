import type React from 'react';
import { useGlobal } from '@/contexts/global.context';
import { usePermission } from '@/contexts/permission.context';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import PlusIcon from '@/components/icons/Plus';

const UserHeader: React.FC = () => {
  const { onOpenModal } = useGlobal();
  const { hasPermission } = usePermission();

  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-5">
      <div>
        <span className="text-xl font-semibold block mb-2">Setup User</span>
        <Breadcrumbs
          items={[
            { title: 'Setting', href: '#' },
            { title: 'User', href: '#' },
          ]}
        />
      </div>

      {hasPermission('create') && (
        <div>
          <ButtonPrimary icon={<PlusIcon className="w-5 h-5" />} onClick={() => onOpenModal('add')}>
            Add New User
          </ButtonPrimary>
        </div>
      )}
    </div>
  );
};

export default UserHeader;
