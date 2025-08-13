'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import Container from '@/atoms/Container';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { signOutAction } from '@/actions/signOut.action';

type AppSidebarProps = {
  active: boolean;
  name: string;
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

export default function AppSidebar(props: Readonly<AppSidebarProps>) {
  const { active, name } = props;
  const { setOpen, open } = useSidebar();
  const [init, setInit] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [transitionClass, setTransitionClass] = useState<string>('opacity-0');
  const segment = useSelectedLayoutSegments('children');
  const { theme, setTheme } = useTheme();

  const onClickSignOut = async () => {
    await signOutAction();
  };

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

  useEffect(() => {
    setInit(true);
  }, []);
  if (segment[0] === 'sign') return null;

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
      <SidebarFooter className="w-full">
        {init && (
          <Container className="flex-1 gap-4 items-center overflow-x-hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="flex-shrink-0 w-8 h-8 focus-visible:ring-0 [&_svg]:!size-6" // 고정 크기
                >
                  {Icon.setting}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[214px] ml-6">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>테마 변경</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked={theme === 'light'} onCheckedChange={() => setTheme('light')}>
                    Light
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={theme === 'dark'} onCheckedChange={() => setTheme('dark')}>
                    Dark
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={theme === 'system'} onCheckedChange={() => setTheme('system')}>
                    System
                  </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onClickSignOut}>로그아웃</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Typography.p className={`transition-all whitespace-nowrap ${open ? 'w-full' : 'w-0'}`}>
              {name}
            </Typography.p>
          </Container>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
