'use clint';

import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/contexts/query.context';
import { NetworkProvider } from '@/contexts/network.context';
import { SidebarProvider } from '@/contexts/sidebar.context';
import { GlobalProvider } from '@/contexts/global.context';
import './globals.css';
import { PermissionProvider } from '@/contexts/permission.context';

const FeedbackModal = dynamic(() => import('@/components/ui/modal/FeedbackModal'));

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Web Application',
  description: 'Page of Web Application',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <QueryProvider>
          <GlobalProvider>
            <NetworkProvider>
              <PermissionProvider>
                <SidebarProvider>
                  <FeedbackModal />
                  <Toaster />
                  {children}
                </SidebarProvider>
              </PermissionProvider>
            </NetworkProvider>
          </GlobalProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
