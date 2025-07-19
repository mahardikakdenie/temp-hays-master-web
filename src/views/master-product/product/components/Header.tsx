import PageHeader from '@/components/ui/page/Header';

const ProductHeader: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Product"
        titleButton="Add new Product"
        onClick={() => {}}
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
