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
import { getTranslations } from 'next-intl/server';

export default async function NewFutureBoxDialog() {
  const t = await getTranslations('Future');
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{t('newBoxButton')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <FormWrapper serverAction={addFutureBoxAction}>
          <DialogHeader>
            <DialogTitle>{t('newBoxTitle')}</DialogTitle>
            <DialogDescription className="pb-2">{t('newSubTitle')}</DialogDescription>
          </DialogHeader>
          <Container className="grid gap-4">
            <Input name="title" placeholder={t('newBoxTitlePlaceholder')} />
            <FutureBoxTypeRadio />
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
