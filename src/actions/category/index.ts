'use server';
import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import { responseServerRoute } from '@/libs/utils/response.utils';
import { CreateCategoryForm, UpdateCategoryForm } from '@/types/category.types';

export const createCategoryApi = async (data: CreateCategoryForm) => {
  return await externalAPI
    .post(Routes.CATEGORY, data)
    .then((respose) => responseServerRoute(respose))
    .catch((error) => catchServerComponent(error));
};

export const updateCategoryApi = async (data: UpdateCategoryForm) => {
  return await externalAPI
    .patch(Routes.CATEGORY, data)
    .then((response) => responseServerRoute(response))
    .catch((error) => catchServerComponent(error));
};
