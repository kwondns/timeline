import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background h-dvh">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="p-2 h-dvh">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
