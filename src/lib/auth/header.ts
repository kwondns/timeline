import * as T from 'fp-ts/Task';
import { headers } from 'next/headers';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { getTokenTask } from '@/lib/auth/cookie';

export const createHeadersTask: T.Task<Headers> = () => headers();

export const extractFromHeader = (key: string) => (defaultValue: string) => (headers: Headers) =>
  headers.get(key) ?? defaultValue;

export const getUserIdTask: T.Task<string> = pipe(createHeadersTask, T.map(extractFromHeader('x-user-id')('guest')));

const generateDefaultHeader = (header?: HeadersInit) => {
  return pipe(
    O.fromNullable(header),
    O.fold(
      () => new Headers(),
      (header) => new Headers(header),
    ),
  );
};

export const setHeaderValue = (header: Headers) => (key: string, value: string) => {
  header.set(key, value);
  return header;
};

const withContentType = (header: Headers) => setHeaderValue(header)('Content-Type', 'application/json');

const withTokenIfExistSync = (header: Headers) => (token: O.Option<string>) =>
  pipe(
    token,
    O.map((token) => setHeaderValue(header)('Authorization', `Bearer ${token}`)),
    O.getOrElse(() => header),
  );

// getTokenTask는 Option이 아닌 Task 타입이기에 변환
const withTokenIfExistAsync = (header: Headers) => {
  return pipe(getTokenTask, T.map(withTokenIfExistSync(header)));
};

export const generateHeader = (header?: HeadersInit) => {
  return pipe(header, generateDefaultHeader, withContentType, withTokenIfExistAsync);
};
