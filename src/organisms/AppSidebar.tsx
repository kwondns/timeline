'use client';

import {
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
import Typography from '@/atoms/Typography';
import Indicator from '@/molecules/Indicator';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
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
import { Icon } from '@/atoms/Icon';
import { useTheme } from 'next-themes';
import { signOutAction } from '@/actions/signOut.action';
import { useEffect, useState } from 'react';
import { useSelectedLayoutSegments } from 'next/navigation';
import MENU from '@/constants/MENU';
import { useLocale, useTranslations } from 'next-intl';
import LanguageTypo from '@/molecules/LanguageTypo';
import { Locale } from '@/i18n/routing';

type AppSidebarWrapperProps = {
  isMounted: boolean;
  active: boolean;
  name: string;
};
export default function AppSidebar(props: AppSidebarWrapperProps) {
  const { isMounted, active, name } = props;
  const { theme, setTheme } = useTheme();
  const [transitionClass, setTransitionClass] = useState<string>('opacity-0');
  const [init, setInit] = useState(false);
  const { open } = useSidebar();
  const segment = useSelectedLayoutSegments('children');
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const route = useRouter();

  const onClickLanguage = (locale: Locale) => {
    route.replace(pathname, { locale });
    route.refresh();
  };

  const onClickSignOut = async () => {
    await signOutAction();
  };
  useEffect(() => {
    setInit(true);
  }, []);

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
    <>
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
              {MENU.map((menu) => (
                <SidebarMenuItem key={menu.key}>
                  <SidebarMenuButton asChild isActive={segment[0] === menu.url.slice(1)}>
                    <Link href={menu.url}>
                      {menu.icon}
                      {open && (
                        <Typography.p
                          className={`transition-opacity duration-200 ease-in-out ${transitionClass} text-foreground`}
                        >
                          {t(menu.key)}
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
                  <DropdownMenuLabel>{t('Setting.language')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked={locale === 'ko'} onCheckedChange={() => onClickLanguage('ko')}>
                    <LanguageTypo locale="ko" text="한국어" />
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={locale === 'en'} onCheckedChange={() => onClickLanguage('en')}>
                    <LanguageTypo locale="en" text="English" />
                  </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{t('Setting.theme')}</DropdownMenuLabel>
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
                <DropdownMenuItem onClick={onClickSignOut}>{t('signOut')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Typography.p className={`transition-all whitespace-nowrap ${open ? 'w-full' : 'w-0'}`}>
              {name}
            </Typography.p>
          </Container>
        )}
      </SidebarFooter>
    </>
  );
}
