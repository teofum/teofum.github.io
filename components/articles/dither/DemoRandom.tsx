import { useState } from 'react';

import DemoImageBase from './DemoImageBase';

import drawImageWithShader from '../../../utils/webgl/runProgram';

const glCache = {
  program: null,
  lastCtx: null
};

const shader = `
precision mediump float;
uniform sampler2D u_image;
uniform float u_threshold;
uniform float u_amplitude;
varying vec2 v_texCoord;

float luma(vec3 color) {
  return color.x * 0.299 + color.y * 0.587 + color.z * 0.114;
}

float rand(){
  return fract(sin(dot(v_texCoord, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec3 color = texture2D(u_image, v_texCoord).xyz;
  float noise = u_amplitude * (rand() - 0.5);
  float value = luma(color) + noise;
  color = value < u_threshold ? vec3(0.0) : vec3(1.0);
  gl_FragColor = vec4(color, 1.0);
}`;

const DemoThreshold = () => {
  const [loaded, setLoaded] = useState(false);
  const [k, setK] = useState(0.5);
  const [original, setOriginal] = useState(false);

  const draw = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
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
        [
          { name: 'u_threshold', value: 0.5 },
          { name: 'u_amplitude', value: k }
        ],
        glCache
      );
    } else {
      const onload = () => setLoaded(true);
      img.addEventListener('load', onload, { once: true });
    }
  };

  return (
    <DemoImageBase draw={draw} hideCanvas={original}>
      <label>
        <span><code>k={k.toFixed(2)}</code></span>
        <input type='range' autoComplete='off' value={k} min={0} max={1} step={0.01}
          onChange={e => setK(parseFloat(e.target.value))} />
      </label>

      <label>
        Show original
        <input type='checkbox' checked={original}
          onChange={e => setOriginal(e.target.checked)} />
        <div className='toggle-slider' />
      </label>
    </DemoImageBase>
  );
};

export default DemoThreshold;