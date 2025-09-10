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
import { LOCALE, Locale } from '@/i18n/routing';

type AppSidebarWrapperProps = {
  isMounted: boolean;
  active: boolean;
  name: string;
};

const LanguageTypoWrapper = ({
  checked,
  locale,
  onCheckedChange,
}: {
  checked: boolean;
  locale: Locale;
  onCheckedChange: () => void;
}) => {
  const t = useTranslations('a11y');
  return (
    <DropdownMenuCheckboxItem
      checked={checked}
      onCheckedChange={onCheckedChange}
      onSelect={(e) => {
        e.preventDefault();
        onCheckedChange();
      }}
      aria-label={t('navigation.languageOption', { language: locale.toUpperCase() })}
    >
      <LanguageTypo locale={locale} />
    </DropdownMenuCheckboxItem>
  );
};
export default function AppSidebarClient(props: AppSidebarWrapperProps) {
  const { isMounted, active, name } = props;
  const { theme, setTheme } = useTheme();
  const [transitionClass, setTransitionClass] = useState<string>('opacity-0');
  const [init, setInit] = useState(false);
  const { open } = useSidebar();
  const segment = useSelectedLayoutSegments('children');
  const t = useTranslations();
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
      <SidebarHeader aria-label={t('a11y.navigation.sidebarHeader')}>
        <SidebarGroup>
          <SidebarGroupContent className="overflow-x-hidden">
            <Typography.h4 className="pl-0.5">
              <Indicator active={active} className={`w-12 whitespace-nowrap`} />
            </Typography.h4>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent role="navigation" aria-label={t('a11y.navigation.mainMenu')}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu role="list">
              {MENU.map((menu) => (
                <SidebarMenuItem key={menu.key} role="listitem">
                  <SidebarMenuButton asChild isActive={segment[0] === menu.url.slice(1)}>
                    <Link
                      href={menu.url}
                      aria-label={t(`Navigation.${menu.key}`)}
                      aria-current={open ? 'page' : undefined}
                    >
                      <span aria-hidden="true" className="flex-shrink-0">
                        {menu.icon}
                      </span>
                      {open && (
                        <Typography.p
                          className={`transition-opacity duration-200 ease-in-out ${transitionClass} text-foreground`}
                          aria-hidden={!open}
                        >
                          {t(`Navigation.${menu.key}`)}
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
      <SidebarFooter className="w-full" role="contentinfo" aria-label={t('a11y.navigation.userSettings')}>
        {init && (
          <Container className="flex-1 gap-4 items-center overflow-x-hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="flex-shrink-0 w-8 h-8 [&_svg]:!size-6 rounded-full focus-visible:ring-1 p-0.5" // 고정 크기
                  aria-label={t('a11y.buttons.openSettings')}
                  aria-expanded="false"
                  aria-haspopup="menu"
                  aria-describedby="settings-description"
                >
                  {Icon.setting}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[214px] ml-6"
                role="menu"
                aria-label={t('a11y.navigation.settingsMenu')}
              >
                <DropdownMenuGroup role="group" aria-labelledby="language-group-label">
                  <DropdownMenuLabel id="language-group-label" role="presentation">
                    {t('Navigation.Setting.language')}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator role="separator" />
                  {LOCALE.map((lang) => (
                    <LanguageTypoWrapper
                      key={lang}
                      locale={lang}
                      onCheckedChange={() => onClickLanguage(lang)}
                      checked={locale === lang}
                    />
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator role="separator" />
                <DropdownMenuGroup role="group" aria-labelledby="theme-group-label">
                  <DropdownMenuLabel id="theme-group-label" role="presentation">
                    {t('Navigation.Setting.theme')}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={theme === 'light'}
                    onCheckedChange={() => setTheme('light')}
                    aria-label={t('a11y.themes.selectLight')}
                  >
                    {t('a11y.themes.light')}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={theme === 'dark'}
                    onCheckedChange={() => setTheme('dark')}
                    aria-label={t('a11y.themes.selectDark')}
                  >
                    {t('a11y.themes.dark')}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={theme === 'system'}
                    onCheckedChange={() => setTheme('system')}
                    aria-label={t('a11y.themes.selectSystem')}
                  >
                    {t('a11y.themes.system')}
                  </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator role="separator" />
                <DropdownMenuItem role="menuitem" aria-label={t('Navigation.signOut')} onClick={onClickSignOut}>
                  {t('Navigation.signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span id="settings-description" className="sr-only">
              {t('a11y.navigation.settingsDescription')}
            </span>
            <Typography.p
              className={`transition-all whitespace-nowrap ${open ? 'w-full' : 'w-0'}`}
              aria-label={t('a11y.navigation.userName', { name })}
              aria-hidden={!open}
            >
              {name}
            </Typography.p>
          </Container>
        )}
      </SidebarFooter>
    </>
  );
}
