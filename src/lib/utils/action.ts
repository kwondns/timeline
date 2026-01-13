import { toast } from 'sonner';
import * as TE from 'fp-ts/TaskEither';
import * as IO from 'fp-ts/IO';
import { pipe } from 'fp-ts/function';

const executeAction = (action: () => Promise<void>) =>
  TE.tryCatch(
    () => action(),
    () => new Error(),
  );
const dismissToast =
  (toastId: string | number): IO.IO<void> =>
  () =>
    toast.dismiss(toastId);

export const callActionWithToast = async (action: () => Promise<void>, t: (key: string) => string) => {
  const loadingToast = toast.loading(t('updateLoading'));
  return pipe(
    action,
    executeAction,
    TE.fold(
      () =>
        pipe(
          TE.rightIO(dismissToast(loadingToast)),
          TE.chainFirstIOK(() => () => toast.error(t('updateError'))),
        ),
      () =>
        pipe(
          TE.rightIO(dismissToast(loadingToast)),
          TE.chainFirstIOK(() => () => toast.success(t('updateSuccess'))),
        ),
    ),
  );
  // try {
  //   await action();
  //   toast.dismiss(loadingToast);
  //   toast.success(t('updateSuccess'));
  // } catch (e) {
  //   toast.dismiss(loadingToast);
  //   toast.error(t('updateError'));
  // }
};
