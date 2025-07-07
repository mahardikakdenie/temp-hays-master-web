import type React from 'react';
import type { Menu } from '@/types/commons.types';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/contexts/sidebar.context';
import { cn } from '@/libs/utils/cn.utils';
import AppIcon from './AppIcon';
import ChevronDownIcon from '../icons/ChevronDown';

type MenuButtonProps = {
  isOpen: boolean;
  menu: Menu;
  activeLinkClass: string;
  hasMatchedChild: boolean;
  onToggleChild: () => void;
};

type MenuLinkProps = {
  isOpen: boolean;
  menu: Menu;
  activeLinkClass: string;
  activeDotClass: string;
};

type MenuItemProps = {
  menu: Menu;
  index: number;
  openChildIndex: number | null;
  setOpenChildIndex: (index: number | null) => void;
};

const MenuButton: React.FC<MenuButtonProps> = ({
  isOpen,
  menu,
  activeLinkClass,
  hasMatchedChild,
  onToggleChild,
}) => (
  <button
    type="button"
    onClick={onToggleChild}
    className={cn(
      'rounded-lg hover:text-primary w-full',
      activeLinkClass,
      isOpen ? 'flex items-center justify-between px-3 py-3' : 'flex justify-center px-2 py-3',
    )}
  >
    <span
      className={cn('text-sm', isOpen ? 'flex items-center gap-3' : 'flex justify-center w-full')}
    >
      <span className="w-5 h-5">
        <AppIcon name={menu.icon} />
      </span>
      {isOpen && <span className="whitespace-nowrap">{menu.name}</span>}
    </span>

    {isOpen && (
      <ChevronDownIcon
        className={cn('transition-transform duration-200 w-5 h-5', hasMatchedChild && 'rotate-180')}
      />
    )}
  </button>
);

const MenuLink: React.FC<MenuLinkProps> = ({ isOpen, menu, activeLinkClass, activeDotClass }) => (
  <Link
    href={menu.path}
    className={cn(
      'text-sm rounded-lg hover:text-primary w-full',
      activeLinkClass,
      isOpen ? 'flex items-center gap-3 px-3 py-2' : 'flex justify-center px-2 py-3',
    )}
  >
    {menu.level === 1 ? (
      <span className="w-5 h-5">
        <AppIcon name={menu.icon} />
      </span>
    ) : (
      <span className={cn('w-1.5 h-1.5 mr-1.75 rounded-full', activeDotClass)} />
    )}
    {isOpen && <span className="whitespace-nowrap">{menu.name}</span>}
  </Link>
);

const MenuItem: React.FC<MenuItemProps> = ({ menu, index, openChildIndex, setOpenChildIndex }) => {
  const { isExpanded, isMobileOpen } = useSidebar();

  const pathname = usePathname();
  const hasChild = menu.child && menu.child.length > 0;
  const hasMatchedChild = openChildIndex === index;

  const isOpen = isExpanded || isMobileOpen;
  const isActive = useCallback((path: string) => pathname === path, [pathname]);
  const isActiveChild = menu.child.some((child) => isActive(child.path)) ?? false;

  const onToggleChild = () => setOpenChildIndex(hasMatchedChild ? null : index);

  const activeLinkClass = isActive(menu.path) || isActiveChild ? 'text-primary' : 'text-gray-400';
  const activeDotClass = isActive(menu.path) ? 'bg-white/90' : 'bg-gray-400';

  return (
    <li>
      {/* HEADER */}
      <div className="flex items-center justify-between w-full">
        {hasChild ? (
          <MenuButton
            isOpen={isOpen}
            menu={menu}
            activeLinkClass={activeLinkClass}
            hasMatchedChild={hasMatchedChild}
            onToggleChild={onToggleChild}
          />
        ) : (
          <MenuLink
            isOpen={isOpen}
            menu={menu}
            activeLinkClass={activeLinkClass}
            activeDotClass={activeDotClass}
          />
        )}
      </div>
      {/* CHILDREN */}
      {hasChild && (
        <div
          className={cn(
            'overflow-hidden transition-[opacity] duration-300 ease-in-out',
            hasMatchedChild ? 'opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className="pl-1.75 mt-1">
            <AppMenu menus={menu.child} />
          </div>
        </div>
      )}
    </li>
  );
};

const AppMenu: React.FC<{ menus: Menu[] }> = ({ menus }) => {
  const [openChildIndex, setOpenChildIndex] = useState<number | null>(null);

  return (
    <ul className="space-y-2">
      {menus.map((menu, index) => (
        <MenuItem
          key={menu.name}
          menu={menu}
          index={index}
          openChildIndex={openChildIndex}
          setOpenChildIndex={setOpenChildIndex}
        />
      ))}
    </ul>
  );
};

export default AppMenu;
