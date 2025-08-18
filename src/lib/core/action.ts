import { toast } from 'sonner';

export const callActionWithToast = async (action: () => Promise<void>) => {
  const loadingToast = toast.loading('수정중...');
  try {
    await action();
    toast.dismiss(loadingToast);
    toast.success('수정 완료!');
  } catch (e) {
    toast.dismiss(loadingToast);
    toast.error('수정 실패!');
  }
};
