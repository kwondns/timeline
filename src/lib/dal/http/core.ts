import { curry } from 'lodash';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';

const getHeader = curry(
  (header: string, res: Response) => res.headers.get(header) ?? res.headers.get(header.toLowerCase()) ?? '',
);
const includesJson = curry((target: string, headerString: string) => headerString.includes(target));

export const isJsonResponse = (res: Response) => pipe(getHeader('content-type')(res), includesJson('application/json'));

const parseText = (res: Response) =>
  TE.tryCatch(
    () => res.text(),
    (_error) => new Error('Invalid JSON'),
  );

const parseJson = <T>(res: Response) =>
  TE.tryCatch(
    () => res.json() as Promise<T>,
    (_error) => new Error(`Invalid JSON. Status=${res.status}`),
  );
export const safeParseJSONWrapper = <T>(res: Response) =>
  pipe(
    TE.of(res),
    TE.chain((r) =>
      isJsonResponse(r)
        ? parseJson<T>(r)
        : pipe(
            parseText(r),
            TE.chain((text) =>
              TE.fromEither(
                E.tryCatch(
                  () => JSON.parse(text) as T,
                  () => new Error(`Unexpected content-type. Expected JSON. Status=${r.status}`),
                ),
              ),
            ),
          ),
    ),
  );

export const safeParseJSON = async <T>(res: Response): Promise<T> => {
  const result = await safeParseJSONWrapper<T>(res)();
  return pipe(
    result,
    E.fold(
      (error) => {
        throw error;
      },
      (data) => {
        return data;
      },
    ),
  );
};

export class UnauthorizedError extends Error {}

export const checkUnAuthorized = TE.fromPredicate(
  (response: Response) => response.status !== 401,
  () => new UnauthorizedError('Unauthorized'),
);

export const checkResponseOk = TE.fromPredicate(
  (res: Response) => res.ok,
  (res: Response) => res,
);

export const parseErrorResponse = (response: Response): TE.TaskEither<Error, Response> =>
  pipe(
    safeParseJSONWrapper<{ message: string | string[] }>(response),
    TE.chain((errorResponse) =>
      TE.left(
        new Error(
          Array.isArray(errorResponse.message) ? errorResponse.message[0] : errorResponse.message || '알 수 없는 오류',
        ),
      ),
    ),
  );
