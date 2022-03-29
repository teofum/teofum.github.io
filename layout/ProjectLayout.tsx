import { MDXProvider } from '@mdx-js/react';

import BaseLayout from './BaseLayout';
import Paragraph from '../components/Paragraph';
import Anchor from '../components/Anchor';

import ProjectMeta from '../types/ProjectMeta';
import { homeCrumb, projectsCrumb } from '../types/Crumbs';

import styles from '../styles/module/ProjectLayout.module.scss';
import ImageGrid from '../components/ImageGrid';

interface ProjectLayoutProps {
  meta: ProjectMeta;
  children: React.ReactNode;
}

const components = {
  p: Paragraph,
  a: Anchor
};

const ProjectLayout = ({ meta, children }: ProjectLayoutProps) => {
  return (
    <BaseLayout title={meta.name} crumbs={[homeCrumb, projectsCrumb]}>
      <div>
        <div className={styles.links}>
          <Anchor href={meta.link}>Visit site</Anchor>
          <Anchor href={meta.repoLink}>View on GitHub</Anchor>
        </div>

        <ImageGrid images={[meta.screenshot]} noScroll />

        <MDXProvider components={components}>
          <article>
            {children}
          </article>
        </MDXProvider>

        <div className={styles.meta}>
          <div>
            <strong>Built with</strong> {meta.tech}
          </div>
          <div>
            <strong>Last updated</strong> {meta.date}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default ProjectLayout;