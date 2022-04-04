import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cn from 'classnames';

import ImageDef from '../types/ImageDef';

import styles from '../styles/module/ImageGrid.module.scss';
import Figure from './Figure';
import Anchor from './Anchor';

interface ImageGridProps {
  images: ImageDef[];
  minSize?: string;
  pixelated?: boolean;
  noScroll?: boolean;
  gallery?: boolean;
  useThumbs?: boolean;
}

const getScaleFactor = () => {
  const scaling = window.devicePixelRatio;
  return Math.round(scaling) / scaling;
};

const ImageGrid = ({
  images,
  minSize,
  pixelated,
  noScroll,
  gallery,
  useThumbs
}: ImageGridProps) => {
  const [view, setView] = useState<number | null>(null);
  const [viewSize, setViewSize] = useState(0);

  const viewImg = images[view || 0];

  return (
    <div className={cn(
      styles.grid,
      {
        [styles.pixelated]: pixelated,
        [styles.noScroll]: noScroll,
        [styles.gallery]: gallery
      }
    )}
      style={{ '--min-size': minSize } as any}>
      {images.map((img, i) => (
        <Figure key={i} img={img} thumb={useThumbs}
          className={styles[img.size || 'normal']}
          onPictureClick={e => {
            const w = (e.target as HTMLImageElement).naturalWidth;
            setView(i);
            setViewSize(w * (pixelated ? getScaleFactor() : 1));
          }} />
      ))}

      <TransitionGroup>
        {view !== null &&
          <CSSTransition classNames={{ ...styles }} timeout={500}>
            <div className={styles.viewOverlay}>
              <div className={styles.controls}>
                {images.length > 1 &&
                  <button disabled={view <= 0}
                    onClick={() => setView(view - 1)}>
                    Previous
                  </button>}
                {images.length > 1 &&
                  <button disabled={view >= images.length - 1}
                    onClick={() => setView(view + 1)}>
                    Next
                  </button>}
                <button onClick={() => setView(null)}>
                  Close
                </button>
                {gallery &&
                  <Anchor href={`${viewImg.src}.${viewImg.formats[viewImg.formats.length - 1]}`}>
                    View full size
                  </Anchor>}
              </div>
              <Figure img={viewImg} width={useThumbs ? undefined : viewSize}
                className={styles.viewFigure}
                onPictureClick={e => e.stopPropagation()} />
            </div>
          </CSSTransition>}
      </TransitionGroup>
    </div>
  );
};

export default ImageGrid;