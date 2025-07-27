'use client';

import PageHeader from '@/components/ui/page/Header';
import ArtistTable from './components/ArtistTable';
import { useGlobal } from '@/contexts/global.context';
import ModalCreateArtist from './components/ModalCreateArtist';
import ModalUpdateArtist from './components/ModalUpdateArtist';

const ArtistViews: React.FC = () => {
  const { onOpenModal } = useGlobal();
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <PageHeader
          items={[
            { title: 'Master', href: '#' },
            { title: 'Artist', href: '/master-setup/artist' },
          ]}
          title="Artist"
          titleButton="Add new Artist"
          isShowBtn
          onClick={() => onOpenModal('add')}
        />
      </div>
      <div className="col-span-12">
        <ArtistTable />
      </div>
      <ModalCreateArtist />
      <ModalUpdateArtist />
    </div>
  );
};

export default ArtistViews;
