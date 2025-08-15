'use client';

import { Sidebar, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { useState } from 'react';
import AppSidebar from '@/organisms/AppSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

type AppSidebarProps = {
  active: boolean;
  name: string;
};

export default function AppSidebarWrapper(props: Readonly<AppSidebarProps>) {
  const { active, name } = props;
  const { open, setOpen } = useSidebar();
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();

  const onClickTrigger = () => {
    setOpen(!open);
    setIsMounted(!open);
  };

  if (isMobile) {
    return (
      <>
        <div
          className={cn(
            'fixed inset-0 bg-black/40 transition-opacity duration-200',
            open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
          )}
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <Sidebar className="z-50" variant="inset">
          <SidebarTrigger className="fixed top-3 right-3" onClick={onClickTrigger} />
          <AppSidebar isMounted={isMounted} active={active} name={name} />
        </Sidebar>
      </>
    );
  }

  return (
    <Sidebar
      className="fixed"
      variant="floating"
      collapsible="icon"
      onMouseEnter={() => {
        setOpen(true);
        setIsMounted(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
        setIsMounted(false);
      }}
    >
      <AppSidebar name={name} isMounted={isMounted} active={active} />
    </Sidebar>
  );
}
