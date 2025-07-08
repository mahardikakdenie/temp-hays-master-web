import type React from 'react';
import { useGlobal } from '@/contexts/global.context';
import { usePermission } from '@/contexts/permission.context';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import PlusIcon from '@/components/icons/Plus';

const AccessHeader: React.FC = () => {
  const { onOpenModal } = useGlobal();
  const { hasPermission } = usePermission();

  return (
    <div className="flex justify-between items-end">
      <div>
        <span className="text-xl font-semibold block mb-2">Setup Access</span>
        <Breadcrumbs
          items={[
            { title: 'Setting', href: '#' },
            { title: 'Access', href: '#' },
          ]}
        />
      </div>

      {hasPermission('create') && (
        <div>
          <ButtonPrimary icon={<PlusIcon className="w-5 h-5" />} onClick={() => onOpenModal('add')}>
            Add New Access
          </ButtonPrimary>
        </div>
      )}
    </div>
  );
};

export default AccessHeader;
