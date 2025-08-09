'use server';

import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { catchServerRoute } from '@/libs/utils/catch.utils';
import { responseServerRoute } from '@/libs/utils/response.utils';
import { UpdateMenu } from '@/types/menu.types';

export const updateMenuApi = async (data: UpdateMenu) => {
  return await externalAPI
    .patch(Routes.AUTH_MENU, data)
    .then((response) => responseServerRoute(response))
    .catch((e) => catchServerRoute(e));
};
