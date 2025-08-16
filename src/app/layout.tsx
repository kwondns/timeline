import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/next';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background h-dvh">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          themes={['light', 'dark', 'system']}
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors expand={false} position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
