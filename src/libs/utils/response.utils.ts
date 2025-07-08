import type { AxiosResponse } from 'axios';

export const responseServerRoute = (response: AxiosResponse) => {
  return {
    status: response.status,
    data: response.data,
    message: response.data.message,
    errors: [],
    traceId: '',
  };
};
