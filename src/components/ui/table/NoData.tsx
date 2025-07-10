interface TableNoDataProps {
  isLoading: boolean;
  error: string;
  isFetching: boolean;
  onRetry: () => void;
  datas: unknown[];
}

const TableNoData: React.FC<TableNoDataProps> = ({
  isLoading,
  error,
  isFetching,
  onRetry,
  datas,
}) => {
  return isLoading || (error && isFetching) ? (
    'Loading...'
  ) : error ? (
    <div className="flex items-center gap-2">
      <span>{error}</span>
      <button onClick={onRetry} className="text-red-500 underline">
        Try again
      </button>
    </div>
  ) : datas.length === 0 ? (
    'No data found.'
  ) : null;
};

export default TableNoData;
