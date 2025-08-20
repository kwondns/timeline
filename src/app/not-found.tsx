import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft, Clock, AlertCircle } from 'lucide-react';

export default function NotFound() {
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
            <CardDescription className="text-lg">페이지를 찾을 수 없습니다</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
              <br />
              시간의 흐름 속에서 길을 잃으셨나요?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="default">
                <Link href="/present" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  현재로 돌아가기
                </Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="/past" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  과거 보기
                </Link>
              </Button>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                여전히 문제가 있다면{' '}
                <Link href="/present" className="underline underline-offset-4 hover:text-foreground transition-colors">
                  현재 페이지
                </Link>
                에서 다시 시작해보세요.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
