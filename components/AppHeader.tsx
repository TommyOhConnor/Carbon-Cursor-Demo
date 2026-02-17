'use client';

import Link from 'next/link';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  SkipToContent,
  Theme,
} from '@carbon/react';

export default function AppHeader() {
  return (
    <Theme theme="g100">
      <HeaderContainer
        render={() => (
          <Header aria-label="Carbon Prototype">
            <SkipToContent href="#main-content" />
            <HeaderName as={Link} href="/" prefix="">
              Carbon Prototype
            </HeaderName>
            <HeaderNavigation aria-label="Carbon Prototype">
              <HeaderMenuItem as={Link} href="/">
                Home
              </HeaderMenuItem>
              <HeaderMenuItem as={Link} href="/dashboard">
                Dashboard
              </HeaderMenuItem>
            </HeaderNavigation>
          </Header>
        )}
      />
    </Theme>
  );
}
