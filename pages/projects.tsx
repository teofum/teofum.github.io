import Link from 'next/link';

import BaseLayout from '../layout/BaseLayout';
import { homeCrumb } from '../types/Crumbs';

import commonStyles from '../styles/module/Common.module.scss';

type ProjectsProps = {
  projects: { name: string, path: string }[]
};

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <BaseLayout title='Projects' crumbs={[ homeCrumb ]}>
      <div className={commonStyles.bigLinks}>
        {projects.map((project, i) => (
          <Link key={i} href={project.path}>{project.name}</Link>
        ))}
      </div>
    </BaseLayout>
  );
};

export const getStaticProps = async () => {
  const projects = [
    {
      name: 'DitherOS',
      path: '/projects/ditheros'
    }
  ];

  return {
    props: {
      projects
    }
  };
};

export default Projects;
