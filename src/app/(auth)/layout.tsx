import { getUser } from '@/lib/dal/user';
import { redirect } from 'next/navigation';
import AppSidebar from '@/organisms/AppSidebar';
import ChatbotTemplate from '@/templates/Chatbot.template';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PresentTemplateProps } from '@/templates/Present.template';
import { callGetWithAuth } from '@/lib/dal/http';
import AuthGuard from '@/molecules/AuthGuard';

export const dynamic = 'force-dynamic';
export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser(true);
  if (!user) redirect('/sign/in');
  const present = await callGetWithAuth<PresentTemplateProps>('/present');

  return (
    <AuthGuard>
      <SidebarProvider className="block" defaultOpen={false}>
        <AppSidebar active={!!present?.startTime} name={user.name} />
        <main className="p-2 pl-18 w-dvw h-dvh">{children}</main>
        <ChatbotTemplate />
      </SidebarProvider>
    </AuthGuard>
  );
}
