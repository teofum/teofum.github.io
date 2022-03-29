import { MouseEventHandler } from 'react';
import ImageDef from '../types/ImageDef';

type FigureProps = {
  img: ImageDef,
  width?: number,
  height?: number,
  className?: string,
  onPictureClick?: MouseEventHandler<HTMLElement>
};

const sources = (img: ImageDef, width?: number, height?: number) => {
  const fallback = img.formats[img.formats.length - 1];
  return img.formats
    .map(format => (
      <source key={format} srcSet={`${img.src}.${format}`}
        type={`image/${format}`} />
    ))
    .concat(
      <img key='img' src={`${img.src}.${fallback}`}
        alt={img.alt} width={width} height={height} />
    );
};

const Figure = ({
  img,
  width,
  height,
  className,
  onPictureClick
}: FigureProps) => {
  return (
    <figure className={className}>
      <picture onClick={onPictureClick}>
        {sources(img, width, height)}
      </picture>
      {img.caption && <figcaption>{img.caption}</figcaption>}
    </figure>
  );
};

export default Figure;