import { useState } from 'react';

import drawImageWithShader from '../../../utils/webgl/runProgram';
import Radio from '../../Radio';
import DemoImageBase from './DemoImageBase';

const glCache = {
  program: null,
  lastCtx: null
};

const shader = `
precision mediump float;
uniform sampler2D u_image;
uniform sampler2D u_thresholdMap;
uniform float u_thresholdSize;
uniform vec2 u_texSize;
varying vec2 v_texCoord;

float luma(vec3 color) {
  return color.x * 0.299 + color.y * 0.587 + color.z * 0.114;
}

vec3 gamma(vec3 color) {
  return vec3(
    pow(color.x, 2.2),
    pow(color.y, 2.2),
    pow(color.z, 2.2)
  );
}

void main() {
  vec2 thresholdCoord = fract(v_texCoord * u_texSize / u_thresholdSize);
  vec3 color = texture2D(u_image, v_texCoord).xyz;
  color = gamma(color);

  float t = texture2D(u_thresholdMap, thresholdCoord).x;
  color = luma(color) < t ? vec3(0.0) : vec3(1.0);
  gl_FragColor = vec4(color, 1.0);
}`;

interface DemoOrderedProps {
  type: 'bayer' | 'blueNoise' | 'halftone';
  sizes: { [key: string]: string };
  initial?: string;
}

const DemoOrdered = ({ type, sizes, initial }: DemoOrderedProps) => {
  const [loaded, setLoaded] = useState(false);
  const [size, setSize] = useState(initial || '8');
  const [original, setOriginal] = useState(false);

  const draw = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    if (!canvas) {
      console.warn('Canvas unavailable');
      return;
    }

    if (!img) {
      console.warn('Image unavailable');
      return;
    }

    if (loaded || img.complete) {
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
        [],
        glCache,
        `${type}Threshold${size}`
      );
    } else {
      const onload = () => setLoaded(true);
      img.addEventListener('load', onload, { once: true });
    }
  };

  return (
    <DemoImageBase draw={draw} hideCanvas={original}>
      <Radio name={`demo_${type}`} label='Map size' value={size}
        set={setSize}
        options={sizes} />

      <label>
        Show original
        <input type='checkbox' checked={original}
          onChange={e => setOriginal(e.target.checked)} />
        <div className='toggle-slider' />
      </label>
    </DemoImageBase>
  );
};

export default DemoOrdered;