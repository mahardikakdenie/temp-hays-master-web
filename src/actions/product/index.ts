'use server';

import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { catchServerRoute } from '@/libs/utils/catch.utils';
import { responseServerRoute } from '@/libs/utils/response.utils';
import { UpdateProductForm } from '@/types/product.types';

export const createProductApi = async (data: FormData) => {
  return await externalAPI
    .post(Routes.PRODUCT, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => responseServerRoute(response))
    .catch((error) => catchServerRoute(error));
};

export const updateProductApi = async (data: UpdateProductForm) => {
  return await externalAPI
    .patch(Routes.PRODUCT, data)
    .then((response) => responseServerRoute(response))
    .catch((error) => catchServerRoute(error));
};

export const updateProductImages = async (data: FormData) => {
  return await externalAPI
    .patch(`${Routes.PRODUCT}/image`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => responseServerRoute(response))
    .catch((error) => catchServerRoute(error));
};
