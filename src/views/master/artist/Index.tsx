'use client';
import PageHeader from '@/components/ui/page/Header';
import ArtistTable from './components/ArtistTable';

const ArtistViews: React.FC = () => {
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
        />
      </div>
      <div className="col-span-12">
        <ArtistTable />
      </div>
    </div>
  );
};

export default ArtistViews;
