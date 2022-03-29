export type ImageFormat = 'webp' | 'jpeg' | 'png' | 'gif';
type ImageDef = {
  src: string,
  formats: ImageFormat[],
  alt: string,
  width?: number,
  height?: number,
  caption?: string
};

export default ImageDef;