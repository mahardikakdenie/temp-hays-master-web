import type React from 'react';
import Image, { StaticImageData } from 'next/image';
import { cn } from '@/libs/utils/cn.utils';

type AvatarProps = {
  src: string | StaticImageData;
  alt?: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  status?: 'online' | 'offline' | 'busy' | 'none';
};

const AVATAR_SIZE_CLASSES = {
  xsmall: 'h-6 w-6 max-w-6',
  small: 'h-8 w-8 max-w-8',
  medium: 'h-10 w-10 max-w-10',
  large: 'h-12 w-12 max-w-12',
  xlarge: 'h-14 w-14 max-w-14',
  xxlarge: 'h-16 w-16 max-w-16',
};

const AVATAR_STATUS_SIZE_CLASSES = {
  xsmall: 'h-1.5 w-1.5 max-w-1.5',
  small: 'h-2 w-2 max-w-2',
  medium: 'h-2.5 w-2.5 max-w-2.5',
  large: 'h-3 w-3 max-w-3',
  xlarge: 'h-3.5 w-3.5 max-w-3.5',
  xxlarge: 'h-4 w-4 max-w-4',
};

const AVATAR_STATUS_COLOR_CLASSES = {
  online: 'bg-green-500',
  offline: 'bg-red-600',
  busy: 'bg-amber-600',
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'medium',
  status = 'none',
}) => {
  return (
    <div className={cn('relative rounded-full p-0.5', AVATAR_SIZE_CLASSES[size])}>
      {/* AVATAR IMAGE */}
      <Image
        width="0"
        height="0"
        sizes="100vw"
        src={src}
        alt={alt}
        className="object-cover w-full rounded-full"
      />
      {/* STATUS INDICATOR */}
      {status !== 'none' && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full',
            AVATAR_STATUS_SIZE_CLASSES[size],
            AVATAR_STATUS_COLOR_CLASSES[status],
          )}
        ></span>
      )}
    </div>
  );
};

export default Avatar;
