'use server';

import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import { responseServerRoute } from '@/libs/utils/response.utils';

export const createArtistApi = async (data: FormData) => {
  return await externalAPI
    .post(Routes.API_ARTIST, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => responseServerRoute(response))
    .catch((error) => catchServerComponent(error));
};

export const updateArtistApi = async (data: FormData) => {
  return await externalAPI
    .patch(Routes.API_ARTIST, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => responseServerRoute(response))
    .catch((e) => catchServerComponent(e));
};
