interface TableNoDataProps {
  isLoading: boolean;
  error: string;
  isFetching: boolean;
  onRetry: () => void;
  banners: unknown[];
}

const TableNoData: React.FC<TableNoDataProps> = ({
  isLoading,
  error,
  isFetching,
  onRetry,
  banners,
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
  ) : banners.length === 0 ? (
    'No Banner found.'
  ) : null;
};

export default TableNoData;
