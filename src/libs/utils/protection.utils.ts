import { NextRequest, NextResponse } from 'next/server';
import { App } from '../constants/app.const';
import type { Context } from '@/types/commons.types';

export const withProtection = (
  handler: (req: NextRequest, context: Context<{ route: string[] }>) => Promise<NextResponse>,
) => {
  return async (req: NextRequest, context: Context<{ route: string[] }>) => {
    const origin = req.headers.get('origin') || '';
    const referer = req.headers.get('referer') || '';

    const allowedOrigins = [App.APP_BASE_URL];

    const isAllowed = (value: string) => {
      return allowedOrigins.some((allowed) => value.startsWith(allowed));
    };

    if ((origin && !isAllowed(origin)) || !isAllowed(referer)) {
      console.warn('BLOCKED REQUEST FROM:', { origin, referer });
      return new NextResponse('', { status: 403 });
    }

    return handler(req, context);
  };
};
