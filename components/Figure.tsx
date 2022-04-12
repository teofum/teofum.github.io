import { KeyboardEventHandler, MouseEventHandler } from 'react';

import ImageDef from '../types/ImageDef';

type FigureProps = {
  img: ImageDef,
  width?: number,
  height?: number,
  tabIndex?: number,
  className?: string,
  thumb?: boolean,
  onPictureClick?: MouseEventHandler<HTMLElement>,
  onPictureKeyDown?: KeyboardEventHandler<HTMLElement>
};

const sources = (img: ImageDef, width?: number, height?: number, thumb?: boolean) => {
  const fallback = img.formats[img.formats.length - 1];
  const srcSet = (format: string) => {
    if (thumb && img.size === 'large')
      return `${img.src}.thumb.lg.${format} 1.5x, ${img.src}.thumb.hd.${format} 1x`;
    else if (thumb)
      return `${img.src}.thumb.hd.${format} 1.5x, ${img.src}.thumb.sd.${format} 1x`;
    else
      return `${img.src}.${format}`;
  };

  return img.formats
    .map(format => (
      <source key={format} srcSet={`${srcSet(format)}`}
        type={`image/${format}`} />
    ))
    .concat(
      <img key='img' src={`${srcSet(fallback)}`}
        alt={img.alt} width={width} height={height} />
    );
};

const Figure = ({
  img,
  width,
  height,
  tabIndex,
  className,
  thumb,
  onPictureClick,
  onPictureKeyDown
}: FigureProps) => {
  return (
    <figure className={className}>
      <picture tabIndex={tabIndex} onClick={onPictureClick}
        onKeyDown={onPictureKeyDown}>
        {sources(img, width, height, thumb)}
      </picture>
      {img.caption && <figcaption>{img.caption}</figcaption>}
    </figure>
  );
};

export default Figure;