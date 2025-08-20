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
import FormWrapper from '@/molecules/FormWrapper';

type NewFutureDialogProps = { boxId: string; type: 'check' | 'progress' };
export default function NewFutureDialog(props: NewFutureDialogProps) {
  const { boxId, type } = props;

  return (
    <Dialog>
      <DialogTrigger className="hover:scale-125 cursor-pointer">{Icon['add']}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <FormWrapper serverAction={addFutureAction}>
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
            <Button type="submit">생성하기</Button>
          </DialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
}
