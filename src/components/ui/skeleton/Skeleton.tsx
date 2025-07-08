import type React from 'react';
import { cn } from '@/libs/utils/cn.utils';

type SkeletonProps = {
  className?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return <div className={cn('animate-pulse', className)} />;
};

export default Skeleton;
