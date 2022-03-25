import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cn from 'classnames';

import styles from '../styles/module/ImageGrid.module.scss';

type ImageDef = { src: string, alt: string, caption?: string };
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
        <figure key={i}>
          <img src={img.src} alt={img.alt}
            onClick={e => {
              const w = (e.target as HTMLImageElement).naturalWidth;
              setView(img);
              setViewSize(w * (pixelated ? getScaleFactor() : 1));
            }} />
          {img.caption && <figcaption>{img.caption}</figcaption>}
        </figure>
      ))}

      <TransitionGroup>
        {view &&
          <CSSTransition classNames={{ ...styles }} timeout={500}>
            <div className={styles.viewOverlay}
              onClick={() => setView(null)}>
              <div className={styles.closeHint}>
                Click anywhere to close
              </div>
              <figure className={styles.viewFigure}>
                <img src={view.src} alt={view.alt} width={viewSize} />
                {view.caption && <figcaption>{view.caption}</figcaption>}
              </figure>
            </div>
          </CSSTransition>}
      </TransitionGroup>
    </div>
  );
};

export default ImageGrid;