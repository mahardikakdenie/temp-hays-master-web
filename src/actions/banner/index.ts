'use server';
import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { catchServerRoute } from '@/libs/utils/catch.utils';
import { responseServerRoute } from '@/libs/utils/response.utils';

export const createBannerApi = async (data: FormData) => {
  return await externalAPI
    .post(Routes.BANNER, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => responseServerRoute(response))
    .catch((error) => catchServerRoute(error));
};

export const updteBannerApi = async (data: FormData) => {
  return await externalAPI.patch(Routes.BANNER, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
