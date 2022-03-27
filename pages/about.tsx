import type { NextPage } from 'next';
import Link from 'next/link';

import BaseLayout from '../layout/BaseLayout';
import { homeCrumb } from '../types/Crumbs';

import commonStyles from '../styles/module/Common.module.scss';

const About: NextPage = () => {
  return (
    <BaseLayout title='About' crumbs={[ homeCrumb ]}>
      <div>
        Nothing here yet.
      </div>
    </BaseLayout>
  );
};

export default About;
