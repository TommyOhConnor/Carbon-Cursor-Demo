'use client';

import { Grid, Column, Heading } from '@carbon/react';
import ImageGallery from '@/components/ImageGallery';
import type { GalleryImage } from '@/components/ImageGallery';

const SAMPLE_IMAGES: GalleryImage[] = [
  {
    src: '/gallery/arlo-couch.png',
    alt: 'Arlo snuggling with his human on the couch',
    caption: 'Best Friends on the Couch',
    subheadline: 'Arlo is snuggling happily with his human on the couch, flashing a joyful smile.',
    orientation: 'landscape',
  },
  {
    src: '/gallery/arlo-box.png',
    alt: 'Arlo in a cardboard box during renovation',
    caption: "Arlo's Construction Comfort Zone",
    subheadline: 'Arlo is supervising the renovation from his cozy cardboard fort.',
    orientation: 'landscape',
  },
  {
    src: '/gallery/arlo-sleeping.png',
    alt: 'Arlo sleeping peacefully while being petted',
    caption: 'Peaceful Nap with Arlo',
    subheadline: 'Arlo is sleeping soundly on a warm lap, enjoying a gentle pet.',
    orientation: 'landscape',
  },
  {
    src: '/gallery/arlo-bed.png',
    alt: 'Arlo relaxing on the bed',
    caption: "Arlo's Bedtime",
    subheadline: 'Arlo is resting comfortably on the bed with his head on a pillow.',
    orientation: 'landscape',
  },
  {
    src: '/gallery/arlo-camping.png',
    alt: 'Arlo lounging at the campsite',
    caption: 'Arlo at Camp',
    subheadline: 'Arlo is lounging in a bright pink camping chair while being petted at the campsite.',
    orientation: 'landscape',
  },
  {
    src: '/gallery/arlo-armchair.png?v=3',
    alt: 'Arlo napping with his human in an armchair',
    caption: "Arlo's Afternoon Rest",
    subheadline: "Arlo is enjoying a cozy nap nestled on his human's lap, being gently petted.",
    orientation: 'landscape',
  },
];

export default function GalleryPage() {
  return (
    <Grid fullWidth className="main-content-grid">
      <Column lg={16} md={8} sm={4}>
        <Heading className="page-heading">Image Gallery</Heading>
        <p style={{ marginBottom: '1.5rem', maxWidth: '65ch' }}>
          Click any image to open the lightbox. Use prev/next to browse, or press Escape to close.
        </p>
        <ImageGallery images={SAMPLE_IMAGES} />
      </Column>
    </Grid>
  );
}
