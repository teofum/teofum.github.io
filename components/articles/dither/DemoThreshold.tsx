import { useEffect, useState } from 'react';
import cn from 'classnames';

import demoStyles from './DemoCommon.module.scss';
import drawImageWithShader from '../../../utils/webgl/runProgram';

const glCache = {
  program: null,
  lastCtx: null
};

const shader = `
precision mediump float;
uniform sampler2D u_image;
uniform float u_threshold;
varying vec2 v_texCoord;

float luma(vec3 color) {
  return color.x * 0.299 + color.y * 0.587 + color.z * 0.114;
}

void main() {
  vec3 color = texture2D(u_image, v_texCoord).xyz;
  float t = u_threshold;
  color = luma(color) < t ? vec3(0.0) : vec3(1.0);
  gl_FragColor = vec4(color, 1.0);
}`;

const DemoThreshold = () => {
  const [loaded, setLoaded] = useState(false);
  const [t, setT] = useState(0.5);
  const [original, setOriginal] = useState(false);

  let canvas: HTMLCanvasElement | null = null;
  let img: HTMLImageElement | null = null;

  useEffect(() => {
    if (!canvas) {
      console.warn('Canvas unavailable');
      return;
    }

    if (!img) {
      console.warn('Image unavailable');
      return;
    }

    if (loaded) {
      const scaling = window.devicePixelRatio;
      const rect = canvas.getBoundingClientRect();
      const scaleX = rect.width * scaling / img.naturalWidth;
      const scaleY = rect.height * scaling / img.naturalHeight;
      const scale = Math.max(scaleX, scaleY);

      canvas.width = img.naturalWidth * scale;
      canvas.height = img.naturalHeight * scale;

      drawImageWithShader(
        img,
        canvas,
        shader,
        [
          { name: 'u_threshold', value: t }
        ],
        glCache
      );
    } else {
      const onload = () => setLoaded(img?.complete || false);
      img.addEventListener('load', onload, { once: true });

      return () => img?.removeEventListener('load', onload);
    }
  }, [canvas, img, t, loaded]);

  return (
    <div className={demoStyles.container}>
      <div className={cn(
        demoStyles.demoFrame,
        demoStyles.wide
      )}>
        <img src='/content/articles/dither/tram-original.webp'
          alt='Original image' ref={el => img = el}
          className={demoStyles.demoContent} />
        <canvas className={demoStyles.canvas}
          style={{ opacity: original ? 0 : 1 }}
          ref={el => canvas = el} />
      </div>

      <div className={demoStyles.controls}>
        <label>
          <span><code>t={t.toFixed(2)}</code></span>
          <input type='range' value={t} min={0} max={1} step={0.01}
            onChange={e => setT(parseFloat(e.target.value))} />
        </label>

        <label>
          Show original
          <input type='checkbox' checked={original}
            onChange={e => setOriginal(e.target.checked)} />
          <div className='toggle-slider' />
        </label>
      </div>
    </div>
  );
};

export default DemoThreshold;