import * as T from 'fp-ts/Task';
import * as O from 'fp-ts/Option';
import { Locale } from '@/i18n/routing';
import { identity, pipe } from 'fp-ts/function';
import { getLocaleTask, getTokenTask } from '@/lib/auth/cookie';
import { getUserIdTask } from '@/lib/auth/header';

export const callGetFromCookieAndHeader = (): T.Task<{ token: string; locale: Locale; userId: string }> =>
  pipe(
    T.Do,
    T.bind('token', () => pipe(getTokenTask, T.map(O.getOrElse(() => '')))),
    T.bind('locale', () => getLocaleTask),
    T.bind('userId', () => getUserIdTask),
    T.map(identity),
  );
