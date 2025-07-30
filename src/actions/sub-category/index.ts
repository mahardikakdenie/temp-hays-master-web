'use server';

import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { catchServerRoute } from '@/libs/utils/catch.utils';
import { responseServerRoute } from '@/libs/utils/response.utils';
import { CreateSCategoryForm } from '@/types/sub-category.types';

export const createSCategoryApi = async (data: CreateSCategoryForm) => {
  return await externalAPI
    .post(Routes.SUB_CATEGORY, data)
    .then((response) => responseServerRoute(response))
    .catch((error) => catchServerRoute(error));
};

export const updateSCategoryApi = async (data: CreateSCategoryForm) => {
  return await externalAPI
    .patch(Routes.SUB_CATEGORY, data)
    .then((response) => responseServerRoute(response))
    .catch((error) => catchServerRoute(error));
};
