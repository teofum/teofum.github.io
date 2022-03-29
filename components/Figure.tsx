import { MouseEventHandler } from 'react';
import ImageDef from '../types/ImageDef';

type FigureProps = {
  img: ImageDef,
  width?: number,
  height?: number,
  className?: string,
  thumb?: boolean,
  onPictureClick?: MouseEventHandler<HTMLElement>
};

const sources = (img: ImageDef, width?: number, height?: number, thumb?: boolean) => {
  const fallback = img.formats[img.formats.length - 1];
  const src = thumb ? `${img.src}.thumb` : img.src;

  return img.formats
    .map(format => (
      <source key={format} srcSet={`${src}.${format}`}
        type={`image/${format}`} />
    ))
    .concat(
      <img key='img' src={`${src}.${fallback}`}
        alt={img.alt} width={width} height={height} />
    );
};

const Figure = ({
  img,
  width,
  height,
  className,
  thumb,
  onPictureClick
}: FigureProps) => {
  return (
    <figure className={className}>
      <picture onClick={onPictureClick}>
        {sources(img, width, height, thumb)}
      </picture>
      {img.caption && <figcaption>{img.caption}</figcaption>}
    </figure>
  );
};

export default Figure;