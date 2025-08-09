import BannerView from '@/views/master-setup/banner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Banner - Hays Gallery',
  description: 'User page of Hays Gallery',
};

const BannerPage = () => {
  return (
    <div>
      <BannerView />
    </div>
  );
};

export default BannerPage;
