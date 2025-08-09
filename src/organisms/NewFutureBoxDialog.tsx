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
import Container from '@/atoms/Container';
import { Input } from '@/components/ui/input';
import { addFutureBoxAction } from '@/actions/addFutureBox.action';
import FutureBoxTypeRadio from '@/molecules/FutureBoxTypeRadio';
import FormWrapper from '@/molecules/FormWrapper';

export default function NewFutureBoxDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">새로운 계획</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <FormWrapper serverAction={addFutureBoxAction}>
          <DialogHeader>
            <DialogTitle>새로운 미래 계획</DialogTitle>
            <DialogDescription className="pb-2">새로운 미래를 설계하세요!</DialogDescription>
          </DialogHeader>
          <Container className="grid gap-4">
            <Input name="title" placeholder="계획 작성" />
            <FutureBoxTypeRadio />
          </Container>
          <DialogFooter className="pt-6">
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">생성하기</Button>
            </DialogClose>
          </DialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
}
