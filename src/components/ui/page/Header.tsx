import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
import Link from 'next/link';

const PageHeader: React.FC<{
  isShowBtn: boolean;
  onClick?: () => void;
  titleButton: string;
  title: string;
  items: {
    title: string;
    href: string;
  }[];
}> = ({ isShowBtn = true, onClick, titleButton = 'Add New', title, items }) => {
  return (
    <div className="flex justify-between items-end">
      <div>
        <span className="text-xl font-semibold block mb-2">{title}</span>
        <Breadcrumbs items={items} />
      </div>

      <div>
        {isShowBtn ? (
          onClick ? (
            <ButtonPrimary className="w-full" onClick={onClick}>
              {titleButton}
            </ButtonPrimary>
          ) : (
            <Link
              href="/master-setup/banner/create"
              className="bg-primary flex items-center justify-center gap-2 text-sm font-semibold py-2.75 px-3.75 rounded-lg transition-colors"
            >
              Add new banner
            </Link>
          )
        ) : null}
      </div>
    </div>
  );
};

export default PageHeader;
