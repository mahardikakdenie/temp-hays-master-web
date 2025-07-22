'use server';

import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import { responseServerRoute } from '@/libs/utils/response.utils';

export const createProductApi = async (data: FormData) => {
  return await externalAPI
    .post(Routes.PRODUCT, data)
    .then((response) => responseServerRoute(response))
    .catch((error) => catchServerComponent(error));
};
