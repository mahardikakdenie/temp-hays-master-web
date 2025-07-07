'use client';

import type React from 'react';
import { startTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppDefaultLayout from '@/components/layout/AppDefault';
import ButtonSecondary from '@/components/ui/button/ButtonSecondary';

const ErrorPage: React.FC<{ error: Error & { digest?: string }; reset: () => void }> = ({
  error,
  reset,
}) => {
  const router = useRouter();

  const handleReset = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <AppDefaultLayout>
      <div className="w-full h-screen max-w-sm mx-auto flex flex-col justify-center items-center gap-4">
        <h1 className="text-xl">500 - Something went wrong!</h1>
        <ButtonSecondary className="w-auto" onClick={handleReset}>
          Try again
        </ButtonSecondary>
      </div>
    </AppDefaultLayout>
  );
};

export default ErrorPage;
