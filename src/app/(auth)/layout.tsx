import { getUser } from '@/lib/dal/user';
import ChatbotTemplate from '@/templates/Chatbot.template';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PresentTemplateProps } from '@/templates/Present.template';
import { callGetWithAuth } from '@/lib/dal/http';
import AppSidebarWrapper from '@/organisms/AppSidebarWrapper';
import { getTokenAndUserId } from '@/lib/auth/token';

export const experimental_ppr = true;

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { userId, token } = await getTokenAndUserId();
  let user = await getUser(userId, token);
  const present = await callGetWithAuth<PresentTemplateProps>('/present', {
    next: { revalidate: false, tags: [`present-${userId}`] },
    userId,
    token,
  });

  return (
    <SidebarProvider className="block" defaultOpen={false}>
      <AppSidebarWrapper active={!!present?.startTime} name={user?.name ?? ''} />
      <main className="p-2 md:pl-18 w-dvw h-dvh">{children}</main>
      <ChatbotTemplate />
    </SidebarProvider>
  );
}
