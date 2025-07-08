import BannerView from '@/views/master-setup/banner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Banner - Web Application',
  description: 'User page of Web Application',
};

const BannerPage = () => {
  return (
    <div>
      <BannerView />
    </div>
  );
};

export default BannerPage;
