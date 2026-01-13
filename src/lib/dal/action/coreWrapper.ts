import { getRefreshTokenTask, getTokenTask } from '@/lib/auth/cookie';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';
import { verifySessionWrapper } from '@/lib/auth/session/verifySessionWrapper';
import { refresh } from '@/lib/auth/token';
import { refreshSession } from '@/lib/auth/session';
import { AuthResponseType } from '@/types/auth.type';

const getTokenTaskTE = pipe(
  getTokenTask,
  TE.fromTask,
  TE.map(() =>
    O.fold(
      () => TE.left(new Error('no token')),
      () => TE.right(undefined),
    ),
  ),
);

const verifySessionTE = pipe(
  verifySessionWrapper(),
  TE.fromTask,
  TE.chain((session) => (session ? TE.right(session) : TE.left(new Error('no session')))),
);

export const shouldRefreshTokenForActionWrapper = () =>
  pipe(
    getTokenTaskTE,
    TE.map(verifySessionTE),
    TE.match(
      () => true,
      () => false,
    ),
  );

type ErrorType = { success: false; error: string };

const getRefreshTokenTE: TE.TaskEither<ErrorType, string> = pipe(
  getRefreshTokenTask,
  TE.fromTask,
  TE.chain(
    O.fold(
      () => TE.left({ success: false as const, error: 'No refresh token' }),
      (refreshToken) => TE.right(refreshToken),
    ),
  ),
);

const callRefreshTE = (refreshToken: string): TE.TaskEither<ErrorType, AuthResponseType> =>
  pipe(
    TE.tryCatch(
      () => refresh(refreshToken),
      () => ({ success: false as const, error: 'Refresh API failed' }),
    ),
    TE.chain((result) => (result ? TE.right(result) : TE.left({ success: false, error: 'Refresh API failed' }))),
  );

const callRefreshSessionTE = (refreshResult: AuthResponseType): TE.TaskEither<ErrorType, AuthResponseType> =>
  pipe(
    TE.tryCatch(
      () => refreshSession(refreshResult),
      () => ({ success: false as const, error: 'Session refresh failed' }),
    ),
    TE.chain((result) =>
      result ? TE.right(refreshResult) : TE.left({ success: false, error: 'Session refresh failed' }),
    ),
  );

export const performTokenRefreshForActionWrapper = () =>
  pipe(
    getRefreshTokenTE,
    TE.chain(callRefreshTE),
    TE.chain(callRefreshSessionTE),
    TE.matchW(
      (e) => ({ success: false, error: e.error }),
      (session) => ({ success: true, userId: session.userId, accessToken: session.accessToken }),
    ),
  );
