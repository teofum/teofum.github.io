import type { NextPage } from 'next';

import BaseLayout from '../layout/BaseLayout';
import { homeCrumb } from '../types/Crumbs';

import commonStyles from '../styles/module/Common.module.scss';

const Projects: NextPage = () => {
  return (
    <BaseLayout title='Projects' crumbs={[ homeCrumb ]}>
      <div className={commonStyles.bigLinks}>
        <a href='https://fumagalli.ar/dither'>DitherLab</a>
      </div>
    </BaseLayout>
  );
};

export default Projects;
