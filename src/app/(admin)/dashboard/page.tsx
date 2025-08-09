import type React from 'react';
import type { Metadata } from 'next';
import DashboardView from '@/views/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard - Hays Gallery',
  description: 'Dashboard page of Hays Gallery',
};

const DashboardPage: React.FC = () => {
  return <DashboardView />;
};

export default DashboardPage;
