import { getUser } from '@/lib/dal/user';
import ChatbotTemplateClient from '@/templates/Chatbot.template.client';
import { SidebarProvider } from '@/components/ui/sidebar';
import { callGetWithAuth } from '@/lib/dal/http';
import AppSidebarWrapperClient from '@/organisms/AppSidebarWrapper.client';
import { getTokenAndUserId } from '@/lib/auth/token';
import PresentTemplateClient from '@/templates/Present.template.client';
import { PresentType } from '@/types/present.type';

export const experimental_ppr = true;

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { userId } = await getTokenAndUserId();
  let user = await getUser();
  const present = await callGetWithAuth<PresentType>('/present', {
    next: { revalidate: false },
    tag: 'present',
  });

  return (
    <SidebarProvider className="block" defaultOpen={false}>
      <PresentTemplateClient title={present.title} startTime={present.startTime} initialContent={present.content}>
        <AppSidebarWrapperClient active={!!present?.startTime} name={user?.name ?? ''} />
        <main className="p-2 md:pl-18 w-dvw h-dvh">{children}</main>
      </PresentTemplateClient>
      <ChatbotTemplateClient userId={userId} />
    </SidebarProvider>
  );
}
