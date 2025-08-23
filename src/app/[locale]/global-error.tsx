/* eslint-disable @next/next/no-sync-scripts */
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  const route = useRouter();
  const onClickBackToPresent = () => {
    route.push('/present');
  };
  const t = useTranslations('Error');

  return (
    <html lang="ko">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          themes={['light', 'dark', 'system']}
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-md">
              <Card className="text-center border-destructive/50 gap-2">
                <CardHeader className="pb-1">
                  <div className="flex justify-center mb-4">
                    <AlertTriangle className="h-16 w-16 text-destructive animate-pulse" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-destructive">
                    {t('GlobalErrorPage.systemError')}
                  </CardTitle>
                  <CardDescription className="text-base">{t('unknownError')}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    {t('GlobalErrorPage.errorText')}
                    <br />
                    {t('GlobalErrorPage.tryLater')}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={reset} className="flex items-center gap-2">
                      <RefreshCcw className="h-4 w-4" />
                      {t('GlobalErrorPage.tryAgain')}
                    </Button>

                    <Button variant="outline" onClick={onClickBackToPresent} className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      {t('GlobalErrorPage.backToHome')}
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      {t('GlobalErrorPage.description1')}
                      <br />
                      {t('GlobalErrorPage.description2')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
