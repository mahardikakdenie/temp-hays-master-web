'use server';

import { redirect } from 'next/navigation';
import { setSession } from '@/libs/utils/session.utils';
import { setCookie } from '@/libs/utils/cookie.utils';
import { catchServerRoute } from '@/libs/utils/catch.utils';
import { App } from '@/libs/constants/app.const';
import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import type { LoginForm } from '@/types/login.types';

export const LoginApi = async (data: LoginForm) => {
  try {
    const response = await externalAPI.post(Routes.AUTH_LOGIN, data);
    await Promise.all([
      setSession(response.data.data.access_token),
      setCookie(App.REDIRECT_NAME, response.data.data.redirect_to),
    ]);
    redirect(response.data.data.redirect_to);
  } catch (error) {
    return await catchServerRoute(error);
  }
};
