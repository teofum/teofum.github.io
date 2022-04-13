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
      {children}
    </h2>
  );
};

export default ArticleHeading;