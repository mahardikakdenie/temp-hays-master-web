import type React from 'react';
import Square2x2Icon from '../icons/Square2x2';
import SettingIcon from '../icons/Setting';
import MaintenanceIcons from '../icons/maintaince';
import SetupIcons from '../icons/Setup';
import MasterIcons from '../icons/Master';
import ProductIcons from '../icons/Product';
import OrderIcons from '../icons/Order';

type AppIconProps = {
  name: string;
};

const AppIcon: React.FC<AppIconProps> = ({ name }) => {
  switch (name) {
    case 'Dashboard':
      return <Square2x2Icon className="w-5 h-5" />;
    case 'Setting':
      return <SettingIcon className="w-5 h-5" />;
    case 'Maintaince':
      return <MaintenanceIcons className="w-5 h-5" />;
    case 'Setup':
      return <SetupIcons className="w-5 h-5" />;
    case 'Master':
      return <MasterIcons className="w-5 h-5" />;
    case 'Product':
      return <ProductIcons className="w-5 h-5" />;
    case 'Order':
      return <OrderIcons className="w-5 h-5" />;
    default:
      return <Square2x2Icon className="w-5 h-5" />;
  }
};

export default AppIcon;
