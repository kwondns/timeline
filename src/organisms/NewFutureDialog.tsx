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
import PriorityRadioClient from '@/molecules/PriorityRadio.client';
import FormWrapperClient from '@/molecules/FormWrapper.client';
import { getTranslations } from 'next-intl/server';

type NewFutureDialogProps = { boxId: string; type: 'check' | 'progress' };
export default async function NewFutureDialog(props: NewFutureDialogProps) {
  const { boxId, type } = props;

  const t = await getTranslations();

  return (
    <Dialog>
      <DialogTrigger className="hover:scale-125 cursor-pointer" aria-label={t('a11y.buttons.addNewFuture')}>
        {Icon['add']}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-modal="true">
        <FormWrapperClient serverAction={addFutureAction}>
          <input type="hidden" name="boxId" value={boxId} />
          <DialogHeader>
            <DialogTitle>{t('Future.newFutureTitle')}</DialogTitle>
            <DialogDescription className="pb-2">{t('Future.newSubTitle')}</DialogDescription>
          </DialogHeader>
          <Container className="grid gap-4">
            <Input
              name="content"
              placeholder={t('Future.newFutureTitlePlaceholder')}
              aria-label={t('a11y.forms.titleInput')}
              required
              aria-required="true"
            />
            <span id="title-help" className="sr-only">
              {t('a11y.forms.required')}
            </span>
            {type === 'check' && (
              <>
                <Separator />
                <Typography.p>{t('Future.priority')}</Typography.p>
                <PriorityRadioClient />
              </>
            )}
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
