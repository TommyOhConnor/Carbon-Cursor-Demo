'use client';

import Link from 'next/link';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderMenu,
  HeaderMenuButton,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  SideNavLink,
  SideNavLinkText,
  SideNavMenu,
  SideNavMenuItem,
  SkipToContent,
} from '@carbon/react';
import { Sun, Moon } from '@carbon/icons-react';
import { useTheme } from '@/components/ThemeProvider';

export default function AppHeader() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'g90' || theme === 'g100';

  return (
    <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="Carbon Prototype">
              <SkipToContent href="#main-content" />
              <HeaderMenuButton
                aria-label="Open menu"
                isActive={isSideNavExpanded}
                onClick={onClickSideNavExpand}
              />
              <HeaderName as={Link} href="/" prefix="">
                Carbon Prototype
              </HeaderName>
              <HeaderNavigation aria-label="Carbon Prototype">
                <HeaderMenuItem as={Link} href="/">
                  Home
                </HeaderMenuItem>
                <HeaderMenu menuLinkName="Forms" aria-label="Forms">
                  <HeaderMenuItem as={Link} href="/dashboard">
                    Form Demo
                  </HeaderMenuItem>
                  <HeaderMenuItem as={Link} href="/onboarding">
                    Onboarding
                  </HeaderMenuItem>
                </HeaderMenu>
                <HeaderMenuItem as={Link} href="/theme">
                  Theme
                </HeaderMenuItem>
                <HeaderMenu menuLinkName="Sliders and Motion" aria-label="Sliders and Motion">
                  <HeaderMenuItem as={Link} href="/gallery">
                    Gallery
                  </HeaderMenuItem>
                  <HeaderMenuItem as={Link} href="/sliders-motion">
                    Testimonials
                  </HeaderMenuItem>
                </HeaderMenu>
              </HeaderNavigation>
              <HeaderGlobalBar>
                <HeaderGlobalAction
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  onClick={toggleTheme}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </HeaderGlobalAction>
              </HeaderGlobalBar>
            </Header>
            <SideNav
              aria-label="Carbon Prototype"
              className="header-sidenav"
              expanded={isSideNavExpanded}
              isChildOfHeader
              onOverlayClick={onClickSideNavExpand}
            >
              <SideNavItems>
                <HeaderSideNavItems>
                  <SideNavLink as={Link} href="/" onClick={onClickSideNavExpand}>
                    <SideNavLinkText>Home</SideNavLinkText>
                  </SideNavLink>
                  <SideNavMenu title="Forms" defaultExpanded>
                    <SideNavMenuItem as={Link} href="/dashboard" onClick={onClickSideNavExpand}>
                      Form Demo
                    </SideNavMenuItem>
                    <SideNavMenuItem as={Link} href="/onboarding" onClick={onClickSideNavExpand}>
                      Onboarding
                    </SideNavMenuItem>
                  </SideNavMenu>
                  <SideNavLink as={Link} href="/theme" onClick={onClickSideNavExpand}>
                    <SideNavLinkText>Theme</SideNavLinkText>
                  </SideNavLink>
                  <SideNavMenu title="Sliders and Motion" defaultExpanded>
                    <SideNavMenuItem as={Link} href="/gallery" onClick={onClickSideNavExpand}>
                      Gallery
                    </SideNavMenuItem>
                    <SideNavMenuItem as={Link} href="/sliders-motion" onClick={onClickSideNavExpand}>
                      Testimonials
                    </SideNavMenuItem>
                  </SideNavMenu>
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          </>
        )}
      />
  );
}
