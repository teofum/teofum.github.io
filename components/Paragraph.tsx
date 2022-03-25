import { DetailedHTMLProps, HTMLAttributes } from 'react';

type ParagraphProps = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;

const Paragraph = ({ children }: ParagraphProps) => {
  let content = children;

  /* Replace last space with non-breaking space to avoid orphans */
  if (typeof children === 'string') {
    content = children
      .trimEnd()
      .replace(/ (?!.* )/, ' ');
  } else if (
    Array.isArray(children) &&
    typeof (children[children.length - 1]) === 'string'
  ) {
    const last = children[children.length - 1]
      .trimEnd()
      .replace(/ (?!.* )/, ' ');

    content = children
      .slice(0, -1)
      .concat(last);
  };

  return (
    <p>{content}</p>
  );
};

export default Paragraph;