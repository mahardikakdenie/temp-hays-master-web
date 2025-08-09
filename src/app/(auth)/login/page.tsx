import type React from 'react';
import type { Metadata } from 'next';
import LoginView from '@/views/auth/login';

export const metadata: Metadata = {
  title: 'Login - Hays Gallery',
  description: 'Authentication page of Hays Gallery',
};

const LoginPage: React.FC = () => {
  return <LoginView />;
};

export default LoginPage;
