import Link from 'next/link';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type HeadingProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

const ArticleHeading = ({ children, ...props }: HeadingProps) => {
  let id: string | undefined;
  if (children) id = children.toString()
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();

  return (
    <h2 id={id} {...props}>
      <span>{children}</span>
      <Link href={`#${id}`}>#</Link>
    </h2>
  );
};

export default ArticleHeading;