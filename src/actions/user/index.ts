'use server';

import { responseServerRoute } from '@/libs/utils/response.utils';
import { catchServerRoute } from '@/libs/utils/catch.utils';
import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import type { CreateUserForm } from '@/types/user.types';
import { CreateRoleForm } from '@/types/role.types';

export const CreateUserApi = async (data: CreateUserForm) => {
  return await externalAPI
    .post(Routes.USER, data)
    .then((response) => responseServerRoute(response))
    .catch((error) => catchServerRoute(error));
};

export const CreateUserAccessApi = async (data: CreateRoleForm) => {
  return await externalAPI
    .post(Routes.USER_ACCESS, data)
    .then((response) => responseServerRoute(response))
    .catch((e) => catchServerRoute(e));
};
