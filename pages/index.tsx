import type { NextPage } from 'next';
import Link from 'next/link';

import BaseLayout from '../layout/BaseLayout';

import commonStyles from '../styles/module/Common.module.scss';

const Home: NextPage = () => {
  return (
    <BaseLayout title='Teo Fumagalli'>
      <div className={commonStyles.bigLinks}>
        <Link href='/about'>About</Link>
        <Link href='/articles'>Articles</Link>
        <Link href='/projects'>Projects</Link>
        <Link href='/photos'>Photos</Link>
      </div>
    </BaseLayout>
  );
};

export default Home;
