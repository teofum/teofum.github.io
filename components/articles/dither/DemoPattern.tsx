import { useEffect, useState } from 'react';

import demoStyles from './DemoCommon.module.scss';

const thresholdMap = [
  0, 12, 3, 15,
  8, 4, 11, 7,
  2, 14, 1, 13,
  10, 6, 9, 5
];

interface DemoPatternProps {
  showZoom?: boolean;
  showRatio?: string;
  initialRatio?: number;
  showPattern?: boolean;
}

const DemoPattern = ({
  showZoom,
  showRatio,
  initialRatio,
  showPattern
}: DemoPatternProps) => {
  const [zoom, setZoom] = useState(1);
  const [ratio, setRatio] = useState((initialRatio === undefined) ? 8 : initialRatio);

  let canvas: HTMLCanvasElement | null = null;

  useEffect(() => {
    const ctx = canvas?.getContext('2d');
    const patternCanvas = document.createElement('canvas');
    const ctxPattern = patternCanvas.getContext('2d');
    if (!canvas || !ctx || !ctxPattern) {
      console.warn('Canvas unavailable');
      return;
    }

    ctx.imageSmoothingEnabled = false;

    const scaling = window.devicePixelRatio;
    const canvasRect = canvas.getBoundingClientRect();
    canvas.width = canvasRect.width * scaling;
    canvas.height = canvasRect.height * scaling;

    const minSize = canvas.width / 64;
    const maxSize = canvas.width / 4;

    const size = Math.round(minSize + zoom * (maxSize - minSize));
    patternCanvas.width = size * 4;
    patternCanvas.height = size * 4;

    // Draw grid
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        const threshold = thresholdMap[(x % 4) + 4 * (y % 4)];

        const bright = threshold / 16;
        const color = showPattern ? `hsl(0, 0%, ${bright * 100}%)` : 'white';

        ctxPattern.fillStyle = threshold < ratio ? color : 'black';
        ctxPattern.fillRect(x * size, y * size, size, size);
      }
    }

    // Repeat grid
    const pattern = ctx.createPattern(patternCanvas, 'repeat');
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [canvas, showPattern, zoom, ratio]);

  return (
    <div className={demoStyles.container}>
      <div className={demoStyles.demoFrame}>
        <canvas className={demoStyles.canvas}
          ref={el => canvas = el} />
      </div>

      <div className={demoStyles.controls}>
        {showZoom &&
          <label>
            Zoom
            <input type='range' autoComplete='off' value={zoom} min={0} max={1} step={0.005}
              onChange={e => setZoom(parseFloat(e.target.value))} />
          </label>}
        {showRatio &&
          <label>
            {showRatio}
            <input type='range' autoComplete='off' value={ratio} min={0} max={16} step={1}
              onChange={e => setRatio(parseInt(e.target.value))} />
          </label>}
      </div>
    </div>
  );
};

export default DemoPattern;