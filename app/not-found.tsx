'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Grid, Column, Heading, Button } from '@carbon/react';

const BASE_PATH = '/Carbon-Cursor-Demo-Pub';

export default function NotFound() {
  useEffect(() => {
    const pathname = window.location.pathname;
    // If we're at the base path without trailing slash, redirect so index.html is served
    if (pathname === BASE_PATH) {
      window.location.replace(`${BASE_PATH}/`);
    }
  }, []);

  return (
    <Grid fullWidth className="main-content-grid">
      <Column lg={10} md={4} sm={4}>
        <Heading className="page-heading">Page not found</Heading>
        <p style={{ marginBottom: '1.5rem', maxWidth: '65ch' }}>
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <Button as={Link} href="/">
          Back to home
        </Button>
      </Column>
    </Grid>
  );
}
