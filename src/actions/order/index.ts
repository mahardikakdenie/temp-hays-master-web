'use server';

import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { catchServerRoute } from '@/libs/utils/catch.utils';
import { responseServerRoute } from '@/libs/utils/response.utils';
import { CreateOrder } from '@/types/orderList.types';

export const createOrderApi = async (data: CreateOrder) => {
  return await externalAPI
    .post(Routes.TRANSACTION, data)
    .then((response) => responseServerRoute(response))
    .catch((error) => catchServerRoute(error));
};
