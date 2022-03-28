import { useEffect } from 'react';
import cn from 'classnames';

import demoStyles from './DemoCommon.module.scss';

interface DemoImageBaseProps {
  draw: (canvas: HTMLCanvasElement, img: HTMLImageElement) => void;
  hideCanvas?: boolean;
  children: React.ReactNode;
}

const DemoImageBase = ({ children, hideCanvas, draw }: DemoImageBaseProps) => {
  let canvas: HTMLCanvasElement | null = null;
  let img: HTMLImageElement | null = null;

  useEffect(() => {
    if (!canvas) {
      console.warn('Canvas is unavailable');
      return;
    }

    if (!img) {
      console.warn('Image is unavailable');
      return;
    }

    draw(canvas, img);
  }, [canvas, img, draw]);

  return (
    <div className={demoStyles.container}>
      <div className={cn(
        demoStyles.demoFrame,
        demoStyles.wide
      )}>
        <picture className={demoStyles.demoContent}>
          <source srcSet='/content/articles/dither/tram-original.webp' type='image/webp' />
          <source srcSet='/content/articles/dither/tram-original.jpeg' type='image/jpeg' />
          <img src='/content/articles/dither/tram-original.jpeg'
            alt='Original image' ref={el => img = el} />
        </picture>
        <canvas className={demoStyles.canvas}
          style={{ opacity: hideCanvas ? 0 : 1 }}
          ref={el => canvas = el} />
      </div>

      <div className={demoStyles.controls}>
        {children}
      </div>
    </div>
  );
};

export default DemoImageBase;