/* eslint-disable @next/next/no-sync-scripts */
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // 에러 로깅 (선택사항)
    console.error('Global error:', error);
  }, [error]);

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
                  <CardTitle className="text-2xl font-bold text-destructive">시스템 오류</CardTitle>
                  <CardDescription className="text-base">예상치 못한 오류가 발생했습니다</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    타임라인 앱에서 문제가 발생했습니다.
                    <br />
                    잠시 후 다시 시도해주세요.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={reset} className="flex items-center gap-2">
                      <RefreshCcw className="h-4 w-4" />
                      다시 시도
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => (window.location.href = '/present')}
                      className="flex items-center gap-2"
                    >
                      <Home className="h-4 w-4" />
                      홈으로 이동
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      문제가 계속 발생한다면 페이지를 새로고침하거나
                      <br />
                      브라우저를 다시 시작해보세요.
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
