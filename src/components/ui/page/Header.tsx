import PlusIcon from '@/components/icons/Plus';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';
// import Link from 'next/link';

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
    <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-5">
      <div className="flex-1 min-w-[200px]">
        <h1 className="text-xl font-semibold block mb-2">{title}</h1>
        <Breadcrumbs items={items} />
      </div>

      <div className="flex-shrink-0">
        {isShowBtn ? (
          <ButtonPrimary icon={<PlusIcon className="w-5 h-5" />} onClick={onClick}>
            {titleButton}
          </ButtonPrimary>
        ) : null}
      </div>
    </div>
  );
};

export default PageHeader;
