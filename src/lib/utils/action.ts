import { toast } from 'sonner';

export const callActionWithToast = async (action: () => Promise<void>, t: (key: string) => string) => {
  const loadingToast = toast.loading(t('updateLoading'));
  try {
    await action();
    toast.dismiss(loadingToast);
    toast.success(t('updateSuccess'));
  } catch (e) {
    toast.dismiss(loadingToast);
    toast.error(t('updateError'));
  }
};
