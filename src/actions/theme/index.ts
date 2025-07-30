'use server';

import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { catchServerRoute } from '@/libs/utils/catch.utils';
import { responseServerRoute } from '@/libs/utils/response.utils';
import { CreateThemeForm } from '@/types/theme.types';

export const createThemeApi = async (data: CreateThemeForm) => {
  return await externalAPI
    .post(Routes.THEME, data)
    .then((response) => responseServerRoute(response))
    .catch((error) => catchServerRoute(error));
};
export const updateThemeApi = async (data: CreateThemeForm) => {
  return await externalAPI
    .patch(Routes.THEME, data)
    .then((response) => responseServerRoute(response))
    .catch((error) => catchServerRoute(error));
};
