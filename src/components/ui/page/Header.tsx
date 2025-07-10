import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';

const PageHeader: React.FC<{
  isShowBtn: boolean;
  onClick: () => void;
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
        {isShowBtn && (
          <ButtonPrimary className="w-full" onClick={() => onClick}>
            {titleButton}
          </ButtonPrimary>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
