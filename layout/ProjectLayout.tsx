import { MDXProvider } from '@mdx-js/react';

import BaseLayout from './BaseLayout';
import Paragraph from '../components/Paragraph';

import ProjectMeta from '../types/ProjectMeta';
import { homeCrumb, projectsCrumb } from '../types/Crumbs';

import styles from '../styles/module/ProjectLayout.module.scss';
import Figure from '../components/Figure';

interface ProjectLayoutProps {
  meta: ProjectMeta;
  children: React.ReactNode;
}

const components = {
  p: Paragraph
};

const ProjectLayout = ({ meta, children }: ProjectLayoutProps) => {
  return (
    <BaseLayout title={meta.name} crumbs={[homeCrumb, projectsCrumb]}>
      <div>
        <div className={styles.links}>
          <a href={meta.link}>Visit site</a>
          <a href={meta.repoLink}>View on GitHub</a>
        </div>

        <Figure img={meta.screenshot} />

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