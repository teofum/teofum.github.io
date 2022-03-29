import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

type AnchorProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

const Anchor = ({ href, children, ...props }: AnchorProps) => (
  <a href={href} {...props} target='_blank' rel='noopener noreferrer'>
    {children}
  </a>
);

export default Anchor;