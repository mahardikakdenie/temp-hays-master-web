import { toast, ToasterProps } from 'sonner';
import { cn } from '@/libs/utils/cn.utils';
import CheckCircleIcon from '@/components/icons/CheckCircle';
import InfoCircleIcon from '@/components/icons/InfoCircle';

type NotificationProps = {
  message: string;
  description?: string;
  type?: 'success' | 'error';
  position?: ToasterProps['position'];
};

const ICONS = {
  success: {
    icon: CheckCircleIcon,
    color: 'text-green-500',
  },
  error: {
    icon: InfoCircleIcon,
    color: 'text-red-600',
  },
};

const Notification = ({
  message,
  description,
  type = 'success',
  position = 'top-center',
}: NotificationProps) => {
  const { icon: Icon, color } = ICONS[type];

  toast.custom(
    (t) => (
      <div
        onClick={() => toast.dismiss(t)}
        className="w-full flex gap-3 items-start bg-ui-900 border border-secondary/[8%] rounded-lg px-4 py-3 cursor-pointer"
      >
        {/* ICON */}
        <Icon className={cn('w-5 h-5', color)} />
        {/* BODY */}
        <div className="flex-1">
          <p className={cn('text-sm font-semibold', color)}>{message}</p>
          {description && <p className="text-sm text-white/90 mt-1">{description}</p>}
        </div>
      </div>
    ),
    { position },
  );
};

export default Notification;
