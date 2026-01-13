import * as TE from 'fp-ts/TaskEither';
import * as TO from 'fp-ts/TaskOption';
import { pipe } from 'fp-ts/function';
import { getRefreshTokenTask } from '@/lib/auth/cookie';
import { safeParseJSONWrapper } from '@/lib/dal/http';
import { AuthResponseType } from '@/types/auth.type';

const fetchTE = (refreshToken: string) =>
  pipe(
    TE.tryCatch(
      () =>
        fetch(`${process.env.API_SERVER_URL}/user/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie: `refresh-token=${refreshToken}`,
          },
          cache: 'no-cache',
        }),
      () => new Error('Network or fetch failed'),
    ),
    TE.map((result) => result),
  );

const getRefreshTokenTE = (refreshToken?: string) =>
  pipe(
    refreshToken ? TO.of(refreshToken) : getRefreshTokenTask,
    TO.map((token) => token),
    TE.fromTaskOption(() => new Error('No refresh token')),
  );

export const refreshWrapper = (refreshToken?: string) =>
  pipe(
    refreshToken,
    getRefreshTokenTE,
    TE.chain(fetchTE),
    TE.chain(safeParseJSONWrapper<AuthResponseType>),
    TE.match(
      () => null,
      (res) => res,
    ),
  );
