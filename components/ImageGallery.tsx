'use client';

import { useState, useCallback } from 'react';
import {
  ComposedModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  IconButton,
  Tile,
} from '@carbon/react';
import { ChevronLeft, ChevronRight } from '@carbon/icons-react';
import styles from './ImageGallery.module.scss';

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  subheadline?: string;
  orientation?: 'portrait' | 'landscape';
};

type ImageGalleryProps = {
  images: GalleryImage[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const count = images.length;

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setOpen(false);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex((count + index) % count);
    },
    [count]
  );

  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);
  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    },
    [goPrev, goNext]
  );

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      closeLightbox();
    },
    [closeLightbox]
  );

  if (count === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <>
      <div
        className={styles.grid}
        role="list"
        aria-label="Image gallery"
      >
        {images.map((img, i) => (
          <div key={i} role="listitem" className={styles.gridItem}>
            <Tile
              className={styles.tile}
              onClick={() => openLightbox(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(i);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View image ${i + 1}: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={styles.thumbnail}
              />
              {img.caption && (
                <span className={styles.caption}>{img.caption}</span>
              )}
              {img.subheadline && (
                <span className={styles.subheadline}>{img.subheadline}</span>
              )}
            </Tile>
          </div>
        ))}
      </div>

      <ComposedModal
        open={open}
        onClose={handleClose}
        onKeyDown={handleKeyDown}
        size="lg"
        aria-label="Image lightbox"
        className={styles.lightbox}
      >
        <ModalHeader
          closeModal={handleClose}
          title={currentImage.caption ?? `Image ${currentIndex + 1} of ${count}`}
          iconDescription="Close lightbox"
        />
        <ModalBody className={styles.modalBody}>
          <div className={styles.lightboxContent}>
            <div className={styles.lightboxImageWrapper}>
              <IconButton
                kind="ghost"
              size="sm"
              label="Previous image"
              onClick={goPrev}
              disabled={count <= 1}
              className={`${styles.navButton} ${styles.navButtonPrev}`}
                wrapperClasses={styles.hideTooltip}
              >
                <ChevronLeft size={20} />
              </IconButton>
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className={styles.lightboxImage}
              />
              <IconButton
                kind="ghost"
                size="sm"
                label="Next image"
                onClick={goNext}
                disabled={count <= 1}
                className={`${styles.navButton} ${styles.navButtonNext}`}
                wrapperClasses={styles.hideTooltip}
              >
                <ChevronRight size={20} />
              </IconButton>
            </div>
          {currentImage.subheadline && (
            <p className={styles.lightboxSubheadline}>{currentImage.subheadline}</p>
          )}
          </div>
        </ModalBody>
        <ModalFooter>
          <span className={styles.counter}>
            {currentIndex + 1} / {count}
          </span>
        </ModalFooter>
      </ComposedModal>
    </>
  );
}
