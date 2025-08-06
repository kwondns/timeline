'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import Typography from '@/atoms/Typography';
import { useEffect, useState } from 'react';
import { useSelectedLayoutSegments } from 'next/navigation';
import Indicator from '@/molecules/Indicator';
import { Icon } from '@/atoms/Icon';

type AppSidebarProps = {
  active: boolean;
};

const Menu: { title: string; url: string; icon: React.ReactNode }[] = [
  {
    title: '현재',
    url: '/present',
    icon: Icon['time'],
  },
  {
    title: '과거',
    url: '/past',
    icon: Icon['sandClock'],
  },
  {
    title: '달력',
    url: '/calendar',
    icon: Icon['calendar'],
  },
  {
    title: '미래',
    url: '/future',
    icon: Icon['rocket'],
  },
  {
    title: '시간',
    url: '/time',
    icon: Icon['analytics'],
  },
];

export default function AppSidebar(props: AppSidebarProps) {
  const { active } = props;
  const { setOpen, open } = useSidebar();
  const [isMounted, setIsMounted] = useState(false);
  const [transitionClass, setTransitionClass] = useState<string>('opacity-0');
  const segment = useSelectedLayoutSegments('children');

  useEffect(() => {
    if (isMounted && open) {
      // 마운트 후 최소 한 틱 지연
      requestAnimationFrame(() => {
        setTransitionClass('opacity-100');
      });
    } else {
      setTransitionClass('opacity-0');
    }
  }, [isMounted, open]);

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
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent className="overflow-x-hidden">
            <Typography.h4 className="pl-0.5">
              <Indicator active={active} className={`w-12 whitespace-nowrap`} />
            </Typography.h4>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {Menu.map((menu) => (
                <SidebarMenuItem key={menu.title}>
                  <SidebarMenuButton asChild isActive={segment[0] === menu.url.slice(1)}>
                    <Link href={menu.url}>
                      {menu.icon}
                      {open && (
                        <Typography.p className={`transition-opacity duration-200 ease-in-out ${transitionClass}`}>
                          {menu.title}
                        </Typography.p>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
