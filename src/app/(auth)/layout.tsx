import { getUser } from '@/lib/dal/user';
import ChatbotTemplate from '@/templates/Chatbot.template';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PresentTemplateProps } from '@/templates/Present.template';
import { callGetWithAuth } from '@/lib/dal/http';
import AppSidebarWrapper from '@/organisms/AppSidebarWrapper';

export const experimental_ppr = true;

export default async function Layout({ children }: { children: React.ReactNode }) {
  let user = await getUser(true);
  const present = await callGetWithAuth<PresentTemplateProps>('/present');

  return (
    <SidebarProvider className="block" defaultOpen={false}>
      <AppSidebarWrapper active={!!present?.startTime} name={user?.name ?? ''} />
      <main className="p-2 md:pl-18 w-dvw h-dvh">{children}</main>
      <ChatbotTemplate />
    </SidebarProvider>
  );
}
