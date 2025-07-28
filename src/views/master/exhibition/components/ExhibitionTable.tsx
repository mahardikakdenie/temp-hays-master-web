import SearchIcon from '@/components/icons/Search';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';
import Input from '@/components/ui/form/Input';
import useExhibitionHook from '../hooks/useExhibition.hook';
import { Table } from '@/components/ui/table/Table';
import HeaderDataUI from '@/components/ui/table/HeaderData';
import TableDataUI from '@/components/ui/table/TableData';
import { useGlobal } from '@/contexts/global.context';
import Pagination from '@/components/ui/table/Pagination';

const ExhibitionTable: React.FC = () => {
  const { onSort, sort, data, onRetry, onSearch, isFetching, isLoading, error, meta, onMeta } =
    useExhibitionHook();
  const { onOpenModal } = useGlobal();
  const headers = [
    {
      name: 'Name',
      key: 'name',
    },
    {
      name: 'Artist Name',
      key: 'artist_name',
    },
    {
      name: 'Description',
      key: 'desc',
    },
    {
      name: 'Start Date',
      key: 'start_date',
    },
    {
      name: 'End Date',
      key: 'end_date',
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
          headers={headers}
          headerWithSorts={['artist_name', 'name', 'desc', 'start_date', 'end_date', 'status']}
          onSort={onSort}
          sort={sort}
        />
        <TableDataUI
          headers={headers}
          data={data}
          isFetching={isFetching}
          isLoading={isLoading}
          error={error}
          onRetry={onRetry}
          onUpdateClick={(data) => onOpenModal('detail', data)}
        />
      </Table>

      <Pagination
        meta={meta}
        context="exhibition"
        onPageChange={(page: number) => onMeta({ page })}
      />
    </div>
  );
};

export default ExhibitionTable;
