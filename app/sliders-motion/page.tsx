'use client';

import {
  Grid,
  Column,
  Heading,
} from '@carbon/react';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import type { Testimonial } from '@/components/TestimonialCarousel';

const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Carbon Design System has transformed how we build consistent, accessible interfaces. The component library and design tokens make it easy to stay on brand.',
    author: 'Sarah Chen',
    role: 'Lead Designer, Acme Corp',
  },
  {
    quote:
      'We adopted Carbon for our enterprise dashboard and saw immediate improvements in development velocity. The documentation and React components are excellent.',
    author: 'Marcus Johnson',
    role: 'Engineering Manager, TechFlow',
  },
  {
    quote:
      'The accessibility built into Carbon saved us months of remediation work. Keyboard navigation and screen reader support work out of the box.',
    author: 'Elena Rodriguez',
    role: 'Accessibility Specialist',
  },
  {
    quote:
      'Carbon motion tokens give our apps a polished, professional feel. Transitions feel intentional and consistent across the entire product.',
    author: 'David Park',
    role: 'Senior Frontend Developer',
  },
];

export default function SlidersMotionPage() {
  return (
    <Grid fullWidth className="main-content-grid">
      <Column lg={16} md={8} sm={4}>
        <Heading className="page-heading">Testimonials</Heading>
        <p style={{ marginBottom: '1.5rem', maxWidth: '65ch' }}>
          Carbon sliders and motion components. Add your demo content here.
        </p>

        <section style={{ marginTop: '2rem' }}>
          <Heading style={{ marginBottom: '1rem', fontSize: '1rem' }}>
            Testimonials
          </Heading>
          <TestimonialCarousel testimonials={SAMPLE_TESTIMONIALS} />
        </section>
      </Column>
    </Grid>
  );
}
