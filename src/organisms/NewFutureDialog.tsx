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
import { getTranslations } from 'next-intl/server';

type NewFutureDialogProps = { boxId: string; type: 'check' | 'progress' };
export default async function NewFutureDialog(props: NewFutureDialogProps) {
  const { boxId, type } = props;

  const t = await getTranslations('Future');

  return (
    <Dialog>
      <DialogTrigger className="hover:scale-125 cursor-pointer">{Icon['add']}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <FormWrapper serverAction={addFutureAction}>
          <input type="hidden" name="boxId" value={boxId} />
          <DialogHeader>
            <DialogTitle>{t('newFutureTitle')}</DialogTitle>
            <DialogDescription className="pb-2">{t('newSubTitle')}</DialogDescription>
          </DialogHeader>
          <Container className="grid gap-4">
            <Input name="content" placeholder={t('newFutureTitlePlaceholder')} />
            {type === 'check' && (
              <>
                <Separator />
                <Typography.p>{t('priority')}</Typography.p>
                <PriorityRadio />
              </>
            )}
          </Container>
          <DialogFooter className="pt-6">
            <DialogClose asChild>
              <Button variant="outline">{t('cancelButton')}</Button>
            </DialogClose>
            <Button type="submit">{t('submitButton')}</Button>
          </DialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
}
