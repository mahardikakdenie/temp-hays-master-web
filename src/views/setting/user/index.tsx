'use client';

import type React from 'react';
import type { Options } from '@/types/commons.types';
import dynamic from 'next/dynamic';
import UserHeader from './components/UserHeader';
import UserTable from './components/UserTable';
import useUser from './hooks/useUser.hook';

const ModalAddUser = dynamic(() => import('./components/ModalAddUser'), { ssr: false });
const ModalFilterUser = dynamic(() => import('./components/ModalFilterUser'), { ssr: false });

type UserViewProps = {
  accessOptions?: Options[];
};

const UserView: React.FC<UserViewProps> = ({ accessOptions }) => {
  const {
    filter,
    appliedFilter,
    onChangeStartDate,
    onChangeEndDate,
    onChangeStatus,
    onSubmitFilter,
    onResetFilter,
  } = useUser();

  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <UserHeader />
      </div>
      <div className="col-span-12">
        <UserTable appliedFilter={appliedFilter} />
      </div>
      {/* MODAL */}
      <ModalAddUser accessOptions={accessOptions} />
      <ModalFilterUser
        filter={filter}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        onChangeStatus={onChangeStatus}
        onSubmitFilter={onSubmitFilter}
        onResetFilter={onResetFilter}
      />
    </div>
  );
};

export default UserView;
