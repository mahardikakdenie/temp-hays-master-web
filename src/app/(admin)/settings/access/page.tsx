import type React from 'react';
import type { Metadata } from 'next';
import AccessView from '@/views/setting/access';

export const metadata: Metadata = {
  title: 'Setup Access - Web Application',
  description: 'Setup Access page of Web Application',
};

const AccessPage: React.FC = () => {
  return <AccessView />;
};

export default AccessPage;
