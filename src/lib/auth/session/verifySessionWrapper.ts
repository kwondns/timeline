import { pipe } from 'fp-ts/function';
import { getSessionTask } from '@/lib/auth/cookie';
import * as TE from 'fp-ts/TaskEither';
import * as O from 'fp-ts/Option';
import { SessionPayload } from '@/lib/auth/session/index';
import { sessionDecryptWrapper } from '@/lib/auth/session/sessionDecryptWrapper';
import { TOKEN_EXPIRY } from '@/constants/TOKEN_TTL';

const calcTimeLeft = (expiresAt: number) => expiresAt - Date.now();

export const verifySessionWrapper = () =>
  pipe(
    getSessionTask,
    TE.fromTask,
    TE.chain(
      pipe(
        O.fold(
          () => TE.left<Error, SessionPayload>(new Error('no session')),
          (session) => sessionDecryptWrapper(session),
        ),
      ),
    ),
    TE.chain((payload) => (payload.userId ? TE.right(payload) : TE.left(new Error('no user id')))),
    TE.chain((payload) =>
      calcTimeLeft(payload.expiresAt) > TOKEN_EXPIRY.THRESHOLD ? TE.right(payload) : TE.left(new Error('expired')),
    ),
    TE.match(
      () => null,
      (payload) => ({ isAuth: true, userId: payload.userId, expiresAt: payload.expiresAt }),
    ),
  );
