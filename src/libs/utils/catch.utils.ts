import { redirect } from 'next/navigation';
import { isAxiosError } from 'axios';
import { HttpStatus } from '../constants/httpStatus.const';
import { deleteSession } from './session.utils';

export const catchServerRoute = async (error: unknown) => {
  if (isAxiosError(error)) {
    console.error(error.response, 'DEBUG');
    const status = error.response?.status;
    const isUnauthorized = status && status === HttpStatus.UNAUTHORIZED;

    if (isUnauthorized) {
      await deleteSession();
    }

    const response = {
      status: error.response?.status ?? 500,
      data: error.response?.data?.data ?? null,
      message: error.response?.data?.message ?? 'A server error occurred. Please try again later.',
      errorCode: error?.response?.data?.errorCode ?? 'INTERNAL_SERVER_ERROR',
      errors: error?.response?.data?.errors ?? [],
      traceId: error?.response?.data?.traceId ?? '',
    };

    return response;
  }

  throw error;
};

export const catchServerComponent = (error: unknown) => {
  if (isAxiosError(error)) {
    console.error(error, 'DEBUG');
    const status = error.response?.status;
    const isUnauthorized = status && status === HttpStatus.UNAUTHORIZED;
    const isForbidden = status && status === HttpStatus.FORBIDDEN;

    if (isUnauthorized) {
      redirect('/api/auth/logout');
    }

    if (isForbidden) {
      redirect('/forbidden');
    }
  }

  throw error;
};
