import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, Clock, AlertCircle } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'Error.NotFoundPage' });
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Clock className="h-16 w-16 text-muted-foreground animate-pulse" />
                <AlertCircle className="h-6 w-6 text-destructive absolute -top-1 -right-1" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">404</CardTitle>
            <CardDescription className="text-lg">{t('title')}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              {t('description1')}
              <br />
              {t('description2')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="default">
                <Link href="/present" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  {t('backToPresent')}
                </Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="/past" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {t('backToPast')}
                </Link>
              </Button>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                {t('subDescription1')}{' '}
                <Link href="/present" className="underline underline-offset-4 hover:text-foreground transition-colors">
                  {t('subDescription2')}
                </Link>
                {t('subDescription3')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
