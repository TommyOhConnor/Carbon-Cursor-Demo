'use client';

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import { Tile, Button } from '@carbon/react';
import { ChevronLeft, ChevronRight, Play, Pause } from '@carbon/icons-react';
import styles from './TestimonialCarousel.module.scss';

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
};

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
  autoAdvanceInterval?: number;
};

const DEFAULT_INTERVAL = 8000;

export default function TestimonialCarousel({
  testimonials,
  autoAdvanceInterval = DEFAULT_INTERVAL,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(autoAdvanceInterval);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastAdvanceTimeRef = useRef(Date.now());

  const prefersReducedMotion = useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      mq.addEventListener('change', onStoreChange);
      return () => mq.removeEventListener('change', onStoreChange);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  );

  const count = testimonials.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex((count + index) % count);
      lastAdvanceTimeRef.current = Date.now();
      setTimeRemaining(autoAdvanceInterval);
    },
    [count, autoAdvanceInterval]
  );

  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  // Auto-advance when not paused and not reduced motion
  useEffect(() => {
    if (count <= 1 || isPaused || prefersReducedMotion) return;
    lastAdvanceTimeRef.current = Date.now();
    const id = setInterval(() => {
      lastAdvanceTimeRef.current = Date.now();
      goNext();
    }, autoAdvanceInterval);
    return () => clearInterval(id);
  }, [count, isPaused, prefersReducedMotion, autoAdvanceInterval, goNext]);

  // Countdown timer - derived from lastAdvanceTime for perfect sync with advance
  useEffect(() => {
    if (count <= 1 || isPaused || prefersReducedMotion) return;
    const tick = 50;
    const id = setInterval(() => {
      const elapsed = Date.now() - lastAdvanceTimeRef.current;
      const remaining = Math.max(0, autoAdvanceInterval - elapsed);
      setTimeRemaining(remaining);
    }, tick);
    return () => clearInterval(id);
  }, [count, isPaused, prefersReducedMotion, autoAdvanceInterval]);

  // Reset countdown when slide changes (e.g. manual prev/next)
  useEffect(() => {
    lastAdvanceTimeRef.current = Date.now();
    setTimeRemaining(autoAdvanceInterval);
  }, [currentIndex, autoAdvanceInterval]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    },
    [goPrev, goNext]
  );

  if (count === 0) return null;

  const showTimer =
    count > 1 && !isPaused && !prefersReducedMotion;
  const progress = showTimer ? timeRemaining / autoAdvanceInterval : 1;

  return (
    <div
      ref={containerRef}
      className={styles.carousel}
      role="region"
      aria-label="Testimonials"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        className={`${styles.track} ${prefersReducedMotion ? styles.noMotion : ''}`}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === currentIndex ? styles.slideCurrent : ''}`}
            aria-hidden={i !== currentIndex}
            aria-live={i === currentIndex ? 'polite' : undefined}
          >
            <Tile className={styles.tile}>
              <blockquote className={styles.quote}>{t.quote}</blockquote>
              <footer className={styles.author}>
                <cite className={styles.authorName}>{t.author}</cite>
                {t.role && <span className={styles.role}> — {t.role}</span>}
              </footer>
            </Tile>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <Button
          kind="ghost"
          size="sm"
          hasIconOnly
          renderIcon={ChevronLeft}
          iconDescription="Previous testimonial"
          aria-label="Previous testimonial"
          onClick={goPrev}
          disabled={count <= 1}
        />
        <div
          className={styles.pauseButtonWrapper}
          role={showTimer ? 'timer' : undefined}
          aria-label={showTimer ? `Next testimonial in ${Math.ceil(timeRemaining / 1000)} seconds` : undefined}
        >
          {showTimer && (
            <svg viewBox="0 0 36 36" className={styles.timerSvg}>
              <circle
                className={styles.timerBg}
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                strokeWidth="2"
              />
              <circle
                key={currentIndex}
                className={styles.timerProgress}
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                strokeWidth="2"
                strokeDasharray={100}
                strokeDashoffset={100 - progress * 100}
              />
            </svg>
          )}
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={isPaused ? Play : Pause}
            iconDescription={isPaused ? 'Play auto-advance' : 'Pause auto-advance'}
            aria-label={isPaused ? 'Play auto-advance' : 'Pause auto-advance'}
            onClick={() => setIsPaused((p) => !p)}
            disabled={count <= 1 || prefersReducedMotion}
            className={styles.pauseButton}
          />
        </div>
        <Button
          kind="ghost"
          size="sm"
          hasIconOnly
          renderIcon={ChevronRight}
          iconDescription="Next testimonial"
          aria-label="Next testimonial"
          onClick={goNext}
          disabled={count <= 1}
        />
      </div>
    </div>
  );
}
