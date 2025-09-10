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
import FutureBoxTypeRadioClient from '@/molecules/FutureBoxTypeRadio.client';
import FormWrapperClient from '@/molecules/FormWrapper.client';
import { getTranslations } from 'next-intl/server';

export default async function NewFutureBoxDialog() {
  const t = await getTranslations();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" aria-label={t('a11y.buttons.addNewFutureBox')}>
          {t('Future.newBoxButton')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-modal="true">
        <FormWrapperClient serverAction={addFutureBoxAction}>
          <DialogHeader>
            <DialogTitle>{t('Future.newBoxTitle')}</DialogTitle>
            <DialogDescription className="pb-2">{t('Future.newSubTitle')}</DialogDescription>
          </DialogHeader>
          <Container className="grid gap-4">
            <Input
              name="title"
              placeholder={t('Future.newBoxTitlePlaceholder')}
              aria-label={t('a11y.forms.titleInput')}
              aria-describedby="box-title-help"
              required
              aria-required="true"
            />
            <span id="box-title-help" className="sr-only">
              {t('a11y.forms.required')}
            </span>
            <FutureBoxTypeRadioClient aria-describedby="box-type-help" />
            <span id="box-type-help" className="sr-only">
              {t('a11y.forms.required')}
            </span>
          </Container>
          <DialogFooter className="pt-6">
            <DialogClose asChild>
              <Button variant="outline" aria-label={t('a11y.buttons.cancel')}>
                {t('Future.cancelButton')}
              </Button>
            </DialogClose>
            <Button type="submit" aria-label={t('a11y.buttons.submit')}>
              {t('Future.submitButton')}
            </Button>
          </DialogFooter>
        </FormWrapperClient>
      </DialogContent>
    </Dialog>
  );
}
