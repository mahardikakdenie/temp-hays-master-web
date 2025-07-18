import { cn } from '@/libs/utils/cn.utils';

const HeaderForm: React.FC<{
  headers: string[];
  selectedSection: string;
  setSelectedSection: (value: string) => void;
}> = ({ headers, selectedSection, setSelectedSection }) => {
  return (
    <div className="mb-4 flex gap-4 justify-between">
      {headers?.map((header) => {
        return (
          <div key={header}>
            <span
              className={cn(
                'capitalize cursor-pointer',
                selectedSection !== header && 'text-slate-500',
              )}
              onClick={() => setSelectedSection(header)}
            >
              {header.replaceAll('-', ' ')}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default HeaderForm;
