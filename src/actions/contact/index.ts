import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';
import { catchServerComponent } from '@/libs/utils/catch.utils';
import { responseServerRoute } from '@/libs/utils/response.utils';
import { CreateContactForm } from '@/types/contact.types';

export const createContactApi = async (data: CreateContactForm) => {
  return await externalAPI
    .post(Routes.API_CONTACT, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => responseServerRoute(response))
    .then((error) => catchServerComponent(error));
};
