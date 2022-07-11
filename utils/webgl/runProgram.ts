import autosizeViewport from './autosizeViewport';
import createShader from './createShader';
import enableAndBindAttrib from './enableAndBindAttrib';
import linkProgram from './linkProgram';
import tex2DFromData from './tex2DFromData';
import tex2DFromImage from './tex2DFromImage';
import thresholds from './thresholds';

export interface WebGLRunnerCache {
  program: WebGLProgram | null
  lastCtx: WebGLRenderingContext | null
}

const vertSource = `
attribute vec4 a_position;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;
void main() {
  gl_Position = a_position;
  v_texCoord = a_texCoord;
}`;

const positions = [
  -1, 1,
  -1, -1,
  1, 1,
  -1, -1,
  1, -1,
  1, 1
];

const texCoords = [
  0.0, 0.0,
  0.0, 1.0,
  1.0, 0.0,
  0.0, 1.0,
  1.0, 1.0,
  1.0, 0.0
];

const drawImageWithShader = (
  img: TexImageSource,
  rt: HTMLCanvasElement,
  fragSource: string,
  uniforms: { name: string, value: number }[],
  cache: WebGLRunnerCache,
  useThreshold: string = ''
) => {
  const gl = rt.getContext('webgl', { preserveDrawingBuffer: true });
  if (!gl) throw new Error('drawImageWithShader: WebGL is unavailable');

  autosizeViewport(gl);

  // Invalidate cache
  if (cache.lastCtx !== gl) {
    cache.program = null;
  }

  // Use cached program if possible
  let program = cache.program;
  if (!program) {
    const vert = createShader(gl, gl.VERTEX_SHADER, vertSource);
    const frag = createShader(gl, gl.FRAGMENT_SHADER, fragSource);

    program = linkProgram(gl, vert, frag);
    cache.program = program;
  }
  cache.lastCtx = gl;

  // Get attribute locations
  const positionAttribLocation = gl.getAttribLocation(program, 'a_position');
  const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');

  const u_image = gl.getUniformLocation(program, 'u_image');
  const u_threshold = gl.getUniformLocation(program, 'u_thresholdMap');
  const u_thresholdSize = gl.getUniformLocation(program, 'u_thresholdSize');
  const u_texSize = gl.getUniformLocation(program, 'u_texSize');
  const u_locs = uniforms.map(uni =>
    gl.getUniformLocation(program!, uni.name));

  // Populate positions buffer
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Populate texCoord buffer
  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

  tex2DFromImage(gl, img);

  const threshold = (thresholds as any)[useThreshold];
  if (threshold) tex2DFromData(
    gl,
    threshold.size,
    threshold.size,
    threshold.data,
    {
      format: gl.LUMINANCE,
      internalFormat: gl.LUMINANCE,
      type: gl.UNSIGNED_BYTE
    },
    gl.TEXTURE1);
  
  // Clear framebuffer
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Set program
  gl.useProgram(program);

  // Set uniforms
  gl.uniform1i(u_image, 0);
  if (threshold) {
    gl.uniform1i(u_threshold, 1);
    gl.uniform1f(u_thresholdSize, threshold.size);
    gl.uniform2f(u_texSize, gl.canvas.width, gl.canvas.height);
  }

  uniforms.forEach((uni, i) =>
    gl.uniform1f(u_locs[i], uni.value));

  // Bind attributes
  enableAndBindAttrib(gl, positionAttribLocation, positionBuffer, {
    size: 2,
    type: gl.FLOAT
  });
  enableAndBindAttrib(gl, texCoordLocation, texCoordBuffer, {
    size: 2,
    type: gl.FLOAT
  });

  // Execute program
  gl.drawArrays(gl.TRIANGLES, 0, 6);
};

export default drawImageWithShader;