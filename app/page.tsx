'use client';

import { Button, TextInput, Grid, Column, Heading } from '@carbon/react';
import { Add } from '@carbon/react/icons';

export default function HomePage() {
  return (
    <Grid fullWidth className="main-content-grid">
      <Column lg={16} md={8} sm={4}>
        <Heading className="page-heading">Welcome to Carbon</Heading>
        <p style={{ marginBottom: '1.5rem' }}>
          This page is built entirely with IBM Carbon Design System components.
          Use the form below and buttons to try the interactive prototype.
        </p>
        <Grid fullWidth narrow>
          <Column lg={8} md={4} sm={4}>
            <TextInput
              id="home-input"
              labelText="Example input"
              placeholder="Type here..."
              className="input-demo"
            />
          </Column>
          <Column lg={8} md={4} sm={4}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button renderIcon={Add} onClick={() => alert('Primary action')}>
                Primary action
              </Button>
              <Button kind="secondary">Secondary</Button>
            </div>
          </Column>
        </Grid>
      </Column>
    </Grid>
  );
}
