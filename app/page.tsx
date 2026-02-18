'use client';

import Image from 'next/image';
import { Grid, Column, Heading } from '@carbon/react';

export default function HomePage() {
  return (
    <Grid fullWidth className="main-content-grid">
      <Column lg={10} md={4} sm={4}>
        <Heading className="page-heading">
          Welcome to Tommy&apos;s Cursor playground
        </Heading>
        <p style={{ marginBottom: '1.5rem', maxWidth: '65ch' }}>
          This site was thrown together with Cursor and IBM Carbon to see how
          fast AI can build with a real design system—and it turns out the combo
          is a cheat code. We get consistent UI and solid accessibility out of
          the box because Carbon bakes it in, so we didn’t have to wire a11y by
          hand. And yeah: for spinning up something like this, Cursor runs
          circles around Figma Make.
        </p>
      </Column>
      <Column lg={6} md={4} sm={4}>
        <figure style={{ marginTop: '3rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <Image
              src="/arlo.png"
              alt="Arlo, Tommy's dog, a black and white speckled dog looking at the camera"
              width={280}
              height={280}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              priority
            />
          </div>
          <figcaption style={{ marginTop: '0.5rem', fontSize: '0.875rem', textAlign: 'center' }}>
            This is Tommy&apos;s dog Arlo.
          </figcaption>
        </figure>
      </Column>
    </Grid>
  );
}
