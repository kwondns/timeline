import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/organisms/AppSidebar';
import { Toaster } from '@/components/ui/sonner';
import { getPresent } from '@/app/present/page';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const present = await getPresent();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background h-dvh">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider className="block" defaultOpen={false}>
            <AppSidebar active={!!present.startTime} />
            <main className="p-2 pl-18 w-dvw h-dvh">{children}</main>
            <Toaster richColors expand={false} position="top-right" />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
