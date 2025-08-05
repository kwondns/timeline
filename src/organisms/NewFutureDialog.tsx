'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Icon } from '@/atoms/Icon';
import { addFutureAction } from '@/actions/addFuture.action';
import Container from '@/atoms/Container';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Typography from '@/atoms/Typography';
import PriorityRadio from '@/molecules/PriorityRadio';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

type NewFutureDialogProps = { boxId: string; type: 'check' | 'progress' };

const EMPTY_LOADING_STATE = '';
const TOAST_DELAY = 500;
const LOADING_MESSAGE = '생성중...';
const SUCCESS_MESSAGE = '생성 완료!';
const ERROR_MESSAGE = '생성 실패!';
const handleToastNotifications = (
  isPending: boolean,
  loading: string | number,
  state: boolean,
  setLoading: (value: string | number) => void,
) => {
  if (isPending) {
    if (loading === EMPTY_LOADING_STATE) {
      const toastId = toast.loading(LOADING_MESSAGE, {});
      setLoading(toastId);
    }
  } else if (loading !== EMPTY_LOADING_STATE) {
    setTimeout(() => {
      toast.dismiss(loading);
      const message = state ? SUCCESS_MESSAGE : ERROR_MESSAGE;
      const toastMethod = state ? toast.success : toast.error;
      toastMethod(message);
      setLoading(EMPTY_LOADING_STATE);
    }, TOAST_DELAY);
  }
};

export default function NewFutureDialog(props: NewFutureDialogProps) {
  const { boxId, type } = props;

  const [state, action, isPending] = useActionState(addFutureAction, false);
  const [loading, setLoading] = useState<string | number>('');

  useEffect(
    () => handleToastNotifications(isPending, loading, state, setLoading),
    [isPending, state, loading, setLoading],
  );

  return (
    <Dialog>
      <DialogTrigger className="hover:scale-125 cursor-pointer">{Icon['add']}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
          <input type="hidden" name="boxId" value={boxId} />
          <DialogHeader>
            <DialogTitle>새로운 미래</DialogTitle>
            <DialogDescription className="pb-2">새로운 미래를 설계하세요!</DialogDescription>
          </DialogHeader>
          <Container className="grid gap-4">
            <Input name="content" placeholder="내용 작성" />
            {type === 'check' && (
              <>
                <Separator />
                <Typography.p>우선순위</Typography.p>
                <PriorityRadio />
              </>
            )}
          </Container>
          <DialogFooter className="pt-6">
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">생성하기</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
