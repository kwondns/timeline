'use client';

import { Sidebar, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (isMobile) {
      if (isMounted && open) {
        // 사이드바가 열릴 때 스크롤 방지
        document.body.style.overflow = 'hidden';
      } else {
        // 사이드바가 닫힐 때 스크롤 복원
        document.body.style.overflow = 'auto';
      }
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, isMounted, open]);

  if (isMobile) {
    return (
      <>
        <div
          className={cn(
            'fixed inset-0 z-50 bg-black/40 transition-opacity duration-200',
            open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
          )}
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <Sidebar className="z-50" variant="floating">
          <SidebarTrigger className="fixed left-3 bottom-3 -z-10" onClick={onClickTrigger} />
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
