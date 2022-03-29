import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cn from 'classnames';

import ImageDef from '../types/ImageDef';

import styles from '../styles/module/ImageGrid.module.scss';
import Figure from './Figure';

interface ImageGridProps {
  images: ImageDef[];
  minSize?: string;
  pixelated?: boolean;
  noScroll?: boolean;
}

const getScaleFactor = () => {
  const scaling = window.devicePixelRatio;
  return Math.round(scaling) / scaling;
};

const ImageGrid = ({ images, minSize, pixelated, noScroll }: ImageGridProps) => {
  const [view, setView] = useState<ImageDef | null>(null);
  const [viewSize, setViewSize] = useState(0);

  return (
    <div className={cn(
      styles.grid,
      {
        [styles.pixelated]: pixelated,
        [styles.noScroll]: noScroll
      }
    )}
      style={{ '--min-size': minSize } as any}>
      {images.map((img, i) => (
        <Figure key={i} img={img} onPictureClick={e => {
          const w = (e.target as HTMLImageElement).naturalWidth;
          setView(img);
          setViewSize(w * (pixelated ? getScaleFactor() : 1));
        }} />
      ))}

      <TransitionGroup>
        {view &&
          <CSSTransition classNames={{ ...styles }} timeout={500}>
            <div className={styles.viewOverlay}
              onClick={() => setView(null)}>
              <div className={styles.closeHint}>
                Click anywhere to close
              </div>
              <Figure img={view} width={viewSize}
                className={styles.viewFigure} />
            </div>
          </CSSTransition>}
      </TransitionGroup>
    </div>
  );
};

export default ImageGrid;