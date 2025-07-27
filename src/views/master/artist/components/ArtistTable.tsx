import SearchIcon from '@/components/icons/Search';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import useArtistHook from '../hooks/useArtist.hook';
import { Table } from '@/components/ui/table/Table';
import HeaderDataUI from '@/components/ui/table/HeaderData';
import TableDataUI from '@/components/ui/table/TableData';
import { useGlobal } from '@/contexts/global.context';
import { Artist } from '@/types/artist.types';

const ArtistTable: React.FC = () => {
  const headers = [
    {
      name: 'Name',
      key: 'name',
    },
    {
      name: 'Email',
      key: 'email',
    },
    {
      name: 'Phone',
      key: 'phone',
    },
    {
      name: 'Status',
      key: 'status',
    },
    {
      name: 'Actions',
      key: 'actions',
    },
  ];
  const { onOpenModal } = useGlobal();
  const { onSearch, onSort, sort, data, isFetching, isLoading, onRetry, error } = useArtistHook();
  return (
    <div className="widget-dark p-6 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div className="hidden md:block">
          <span className="text-lg font-semibold">List Data Artist</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full sm:min-w-[300px]">
            <Input
              className="bg-ui-800 py-3 border-none"
              placeholder="Search..."
              icon={<SearchIcon className="w-5 h-5" />}
              iconPosition="left"
              onChange={onSearch}
            />
          </div>
          <ButtonSecondary className="w-full lg:w-40">Filter</ButtonSecondary>
        </div>
      </div>

      <Table>
        <HeaderDataUI
          headerWithSorts={['name', 'email', 'phone', 'status']}
          headers={headers}
          onSort={onSort}
          sort={sort}
        />

        <TableDataUI
          headers={headers}
          data={data}
          isFetching={isFetching}
          isLoading={isLoading}
          onRetry={onRetry}
          error={error}
          onUpdateClick={(data: Artist) => {
            onOpenModal('detail', data);
          }}
        />
      </Table>
    </div>
  );
};

export default ArtistTable;
