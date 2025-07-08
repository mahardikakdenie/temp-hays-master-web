'use client';

import type React from 'react';

type AppDefaultLayoutProps = {
  children: React.ReactNode;
};

const AppDefaultLayout: React.FC<AppDefaultLayoutProps> = ({ children }) => {
  return (
    <div className="p-6 sm:p-0">
      {/* AREA CONTENT */}
      <div className="flex flex-col lg:flex-row w-full h-screen justify-center sm:p-0">
        {children}
      </div>
    </div>
  );
};

export default AppDefaultLayout;
