import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import { jwtVerify } from 'jose';
import { encodedKey, SessionPayload } from '@/lib/auth/session/index';

export const sessionDecryptWrapper = (session: string | undefined = '') =>
  pipe(
    TE.tryCatch(
      () => jwtVerify(session, encodedKey, { algorithms: ['HS256'] }),
      () => new Error('토큰 검증 오류'),
    ),
    TE.map(({ payload }) => payload as SessionPayload),
  );
