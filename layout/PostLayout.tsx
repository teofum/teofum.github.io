import { MDXProvider } from '@mdx-js/react';
import cn from 'classnames';

import Paragraph from '../components/Paragraph';
import Settings from '../components/Settings';
import PostMeta from '../types/PostMeta';

import styles from '../styles/module/PostLayout.module.scss';
import Head from 'next/head';
import ScrollProgress from '../components/ScrollProgress';

interface PostLayoutProps {
  meta: PostMeta;
  children: React.ReactNode;
}

const components = {
  p: Paragraph
};

const PostLayout = ({ meta, children }: PostLayoutProps) => {
  return (
    <div className={styles.layoutRoot}>
      <Head>
        <title>{meta.title}</title>
      </Head>
      <header className={cn(styles.mainContent, styles.header)}>
        <div className={styles.headerContent}>
          <h1>{meta.title}</h1>
        </div>
      </header>

      <ScrollProgress />

      <aside className={cn(styles.mainContent, styles.settings)}>
        <Settings />
      </aside>

      <MDXProvider components={components}>
        <main className={styles.mainContent}>
          <article>
            {children}
          </article>
        </main>
      </MDXProvider>
    </div>
  );
};

export default PostLayout;