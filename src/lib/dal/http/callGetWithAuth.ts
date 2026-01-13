import { redirect } from '@/i18n/navigation';
import {
  checkResponseOk,
  checkUnAuthorized,
  parseErrorResponse,
  safeParseJSONWrapper,
  UnauthorizedError,
} from '@/lib/dal/http/core';
import { pipe } from 'fp-ts/function';
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import { generateHeader, getUserIdTask, setHeaderValue } from '@/lib/auth/header';
import { getLocaleTask } from '@/lib/auth/cookie';
import * as E from 'fp-ts/Either';

const generateHeaderWithCacheKey = (header?: HeadersInit) =>
  pipe(
    header,
    generateHeader,
    T.chain((header) =>
      pipe(
        getUserIdTask,
        T.map((userId) => setHeaderValue(header)('x-cache-key', `uid-${userId}`)),
      ),
    ),
  );

const generateNextTag = (tag: string) =>
  pipe(
    getUserIdTask,
    T.map((userId) => [`${tag}-${userId}`]),
  );

const requestFetch = (url: string, h: Headers, tags: string[], option: RequestInit) => {
  return TE.tryCatch(
    () =>
      new Promise<Response>((resolve, reject) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 10000);
        fetch(`${process.env.API_SERVER_URL}${url}`, {
          method: 'GET',
          credentials: 'include',
          headers: h,
          next: { tags, ...option?.next },
        })
          .then((res) => resolve(res))
          .catch((e) => reject(e))
          .finally(() => clearTimeout(id));
      }),
    (e) => {
      return e instanceof Error ? e : new Error(String(e));
    },
  );
};

const doRequest = (url: string, tag: string, option: RequestInit) =>
  pipe(
    TE.Do,
    TE.bind('tags', () => pipe(generateNextTag(tag), TE.fromTask)),
    TE.bind('headers', () => pipe(generateHeaderWithCacheKey(option?.headers), TE.fromTask)),
    TE.bind('response', ({ headers, tags }) => requestFetch(url, headers, tags, option)),
    TE.map(({ response }) => response),
  );

const parseValidatedResponse = <T>(response: TE.TaskEither<Error, Response>) =>
  pipe(
    response,
    TE.chain((res) => checkUnAuthorized(res)),
    TE.chain((res) => pipe(res, checkResponseOk, TE.orElse(parseErrorResponse))),
    TE.chain((res) => safeParseJSONWrapper<T>(res)),
  );

export async function callGetWithAuth<T>(url: string, options: RequestInit & { tag: string }): Promise<T> {
  const { tag, ...option } = options;
  const fetchResult = await pipe(doRequest(url, tag, option), parseValidatedResponse<T>)();
  return pipe(
    fetchResult,
    E.match(
      (error) => {
        if (error instanceof UnauthorizedError) {
          pipe(
            getLocaleTask,
            T.map((locale) => redirect({ href: '/sign/in?toast=loginRequired', locale })),
          )();
          throw error;
        }
        throw error;
      },
      (data) => data,
    ),
  );
}
