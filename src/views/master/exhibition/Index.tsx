'use client';
import PageHeader from '@/components/ui/page/Header';
import { useGlobal } from '@/contexts/global.context';
import ExhibitionTable from './components/ExhibitionTable';

const ExhibitionViews: React.FC = () => {
  const { onOpenModal } = useGlobal();
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <PageHeader
          items={[
            { title: 'Master', href: '#' },
            { title: 'Exhibition', href: '/master-setup/exhibition' },
          ]}
          title="Exhibition"
          titleButton="Add new Exhibition"
          isShowBtn
          onClick={() => onOpenModal('add')}
        />
      </div>

      <div className="col-span-12">
        <ExhibitionTable />
      </div>
    </div>
  );
};

export default ExhibitionViews;
