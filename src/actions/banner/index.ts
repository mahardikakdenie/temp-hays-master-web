'use server';
import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { catchServerRoute } from '@/libs/utils/catch.utils';
import { responseServerRoute } from '@/libs/utils/response.utils';
import { BannerForm } from '@/types/banner.types';

export const createBannerApi = async (data: BannerForm) => {
  return await externalAPI
    .post(Routes.BANNER, data)
    .then((response) => responseServerRoute(response))
    .catch((error) => catchServerRoute(error));
};
