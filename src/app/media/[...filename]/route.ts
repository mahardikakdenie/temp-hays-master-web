import { NextRequest } from 'next/server';
import { Api } from '@/libs/constants/api.const';
import { Routes } from '@/libs/constants/routes.const';
import type { Context } from '@/types/commons.types';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest, context: Context<{ filename: string[] }>) => {
  const { params } = context;
  const { filename } = await params;

  const path = filename.join('/');
  const target = `${Api.API_MEDIA_URL}${Routes.API_MEDIA}/${path}`;
  const response = await fetch(target);

  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'public, max-age=86400'); // 1 Days

  return new Response(response.body, {
    status: 200,
    headers,
  });
};
