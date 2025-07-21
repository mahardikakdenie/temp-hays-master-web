'use client';
import ThemeHeader from './components/Header';
import ModalCreateTheme from './components/ModalCreateTheme';
import ModalUpdateTheme from './components/ModalUpdateTheme';
import ThemeTable from './components/Table';
const ThemeViews: React.FC = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 mb-4">
        <ThemeHeader />
      </div>

      <div className="col-span-12">
        <ThemeTable />
      </div>
      <ModalCreateTheme />
      <ModalUpdateTheme />
    </div>
  );
};

export default ThemeViews;
