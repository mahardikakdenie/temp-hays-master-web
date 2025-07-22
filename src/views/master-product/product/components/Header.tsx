import PageHeader from '@/components/ui/page/Header';
import { useRouter } from 'next/navigation';

const ProductHeader: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <PageHeader
        title="Product"
        titleButton="Add new Product"
        onClick={() => router.push(`/master-product/product/create`)}
        items={[
          { title: 'Master product', href: '#' },
          { title: 'Products', href: '/master-setup/product' },
        ]}
        isShowBtn
      />
    </div>
  );
};

export default ProductHeader;
