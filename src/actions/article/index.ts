'use server';

import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { catchServerRoute } from '@/libs/utils/catch.utils';
import { responseServerRoute } from '@/libs/utils/response.utils';

export const createArticleApi = async (data: FormData) => {
  return await externalAPI
    .post(Routes.ARTICLE, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => responseServerRoute(response))
    .catch((error) => catchServerRoute(error));
};

export const updateArticleApi = async (data: FormData) => {
  return await externalAPI
    .patch(Routes.ARTICLE, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((responses) => responseServerRoute(responses))
    .catch((error) => catchServerRoute(error));
};
