import { MDXProvider } from '@mdx-js/react';

import BaseLayout from './BaseLayout';
import Paragraph from '../components/Paragraph';
import ScrollProgress from '../components/ScrollProgress';
import { articleSettings } from '../components/Settings';

import PostMeta from '../types/PostMeta';
import { articlesCrumb, homeCrumb } from '../types/Crumbs';

interface PostLayoutProps {
  meta: PostMeta;
  children: React.ReactNode;
}

const components = {
  p: Paragraph
};

const PostLayout = ({ meta, children }: PostLayoutProps) => {
  return (
    <BaseLayout title={meta.title} crumbs={[ homeCrumb, articlesCrumb ]}
      settings={articleSettings}>
      <ScrollProgress />
      <MDXProvider components={components}>
        <article>
          {children}
        </article>
      </MDXProvider>
    </BaseLayout>
  );
};

export default PostLayout;