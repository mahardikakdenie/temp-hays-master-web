'use server';

import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { catchServerRoute } from '@/libs/utils/catch.utils';
import { responseServerRoute } from '@/libs/utils/response.utils';

export const createExhibitionApi = async (data: FormData) => {
  return await externalAPI
    .post(Routes.API_EXHIBITION, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => responseServerRoute(response))
    .catch((e) => catchServerRoute(e));
};

export const updateExhibitionApi = async (data: FormData) => {
  return await externalAPI
    .patch(Routes.API_EXHIBITION, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => responseServerRoute(response))
    .catch((e) => catchServerRoute(e));
};
