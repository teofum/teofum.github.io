import { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './DemoGammaGradient.module.scss';
import demoStyles from '../DemoCommon.module.scss';

import drawImageWithShader from '../../../utils/webgl/runProgram';

const glCache = {
  program: null,
  lastCtx: null
};

const shader = `
precision mediump float;
uniform sampler2D u_image;
uniform sampler2D u_thresholdMap;
uniform float u_gamma;
uniform float u_thresholdSize;
uniform vec2 u_texSize;
varying vec2 v_texCoord;

float luma(vec3 color) {
  return color.x * 0.299 + color.y * 0.587 + color.z * 0.114;
}

vec3 gamma(vec3 color) {
  return vec3(
    pow(color.x, u_gamma),
    pow(color.y, u_gamma),
    pow(color.z, u_gamma)
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

const DemoGammaGradient = () => {
  let canvas: HTMLCanvasElement | null = null;
  let glCanvas: HTMLCanvasElement | null = null;

  const [gamma, setGamma] = useState(1);

  useEffect(() => {
    if (!canvas || !glCanvas) {
      console.warn('Canvas unavailable');
      return;
    }

    const scaling = 1;
    const canvasRect = canvas.getBoundingClientRect();
    canvas.width = canvasRect.width * scaling;
    canvas.height = canvasRect.height * scaling;
    glCanvas.width = canvasRect.width * scaling;
    glCanvas.height = canvasRect.height * scaling;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.warn('Canvas context unavailable');
      return;
    }

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(1, 'white');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawImageWithShader(
      canvas,
      glCanvas,
      shader,
      [
        {
          name: 'u_gamma',
          value: gamma
        }
      ],
      glCache,
      'bayerThreshold8'
    );
  }, [canvas, glCanvas, gamma]);

  return (
    <div className={cn(
      demoStyles.container,
      styles.doubleFrame
    )}>
      <div className={cn(
        demoStyles.demoFrame,
        styles.demoFrame
      )}>
        <canvas className={demoStyles.canvas}
          ref={el => canvas = el} />
      </div>

      <div className={cn(
        demoStyles.demoFrame,
        styles.demoFrame
      )}>
        <canvas className={demoStyles.canvas}
          ref={el => glCanvas = el} />
      </div>

      <div className={cn(
        demoStyles.controls,
        styles.controls
      )}>
        <label>
          <span><code>gamma={gamma.toFixed(2)}</code></span>
          <input type='range' autoComplete='off' value={gamma} min={1} max={4.5} step={0.05}
            onChange={e => setGamma(parseFloat(e.target.value))} />
        </label>
      </div>
    </div>
  );
};

export default DemoGammaGradient;
