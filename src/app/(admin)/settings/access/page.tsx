import type React from 'react';
import type { Metadata } from 'next';
import AccessView from '@/views/setting/access';

export const metadata: Metadata = {
  title: 'Setup Access - Hays Gallery',
  description: 'Setup Access page of Hays Gallery',
};

const AccessPage: React.FC = () => {
  return <AccessView />;
};

export default AccessPage;
