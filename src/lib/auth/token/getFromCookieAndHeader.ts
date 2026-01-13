'use server';

import { callGetFromCookieAndHeader } from '@/lib/auth/token/callGetFromCookieAndHeader';

export const getFromCookieAndHeader = async () => callGetFromCookieAndHeader()();
