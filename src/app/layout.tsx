import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/organisms/AppSidebar';
import { Toaster } from '@/components/ui/sonner';
import ChatbotTemplate from '@/templates/Chatbot.template';
import { PresentTemplateProps } from '@/templates/Present.template';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const response = await fetch(`${process.env.API_SERVER_URL}/present`, { method: 'GET' });
  const present = (await response.json()) as PresentTemplateProps;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background h-dvh">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider className="block" defaultOpen={false}>
            <AppSidebar active={!!present.startTime} />
            <ChatbotTemplate />
            <main className="p-2 pl-18 w-dvw h-dvh">{children}</main>
            <Toaster richColors expand={false} position="top-right" />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
