import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import Header from '@/templates/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background h-dvh">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <div className="px-2 h-[calc(100dvh-88px)]">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
