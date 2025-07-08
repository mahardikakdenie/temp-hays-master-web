'use client';

import type React from 'react';
import type { User } from '@/types/commons.types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ManImage } from '@/libs/constants/assets.const';
import Avatar from '../ui/avatar/Avatar';
import Dropdown from '../ui/dropdown/Dropdown';
import DropdownItem from '../ui/dropdown/DropdownItem';
import SettingIcon from '../icons/Setting';
import PowerIcon from '../icons/Power';

type AppUserProps = {
  user: User;
};

const AppUser: React.FC<AppUserProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const onToggleDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const onCloseDropdown = () => {
    setIsOpen(false);
  };

  const onLogoutHandler = async () => {
    router.replace('/api/auth/logout');
  };

  return (
    <div className="relative">
      {/* USER */}
      <button onClick={onToggleDropdown} className="flex items-center dropdown-toggle">
        <span className="mr-4 rounded-full">
          <Avatar src={user.image || ManImage} alt="Avatar" status="online" />
        </span>
        <div className="text-left">
          <span className="block text-sm">{user.fullname}</span>
          <span className="block text-xs text-gray-400">{user.access_name}</span>
        </div>
      </button>
      {/* DROPDOWN */}
      <Dropdown
        isOpen={isOpen}
        onClose={onCloseDropdown}
        className="mt-[17px] flex flex-col w-[260px] p-3"
      >
        <div>
          <span className="block text-md">{user.fullname}</span>
          <span className="mt-0.5 block text-xs text-gray-400">{user.email}</span>
        </div>
        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-secondary/[8%] text-gray-400">
          <li>
            <DropdownItem
              onItemClick={onCloseDropdown}
              tag="a"
              href="/profile"
              className="flex items-center gap-3 group text-sm"
            >
              <SettingIcon className="w-5 h-5" />
              Account Setting
            </DropdownItem>
          </li>
        </ul>
        <div
          className="flex items-center gap-3 px-3 py-2.5 mt-3 rounded-lg group text-sm text-gray-400 hover:text-primary cursor-pointer"
          onClick={onLogoutHandler}
        >
          <PowerIcon className="w-5 h-5" />
          Log Out
        </div>
      </Dropdown>
    </div>
  );
};

export default AppUser;
