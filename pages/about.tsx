import type { NextPage } from 'next';

import BaseLayout from '../layout/BaseLayout';
import Paragraph from '../components/Paragraph';
import { homeCrumb } from '../types/Crumbs';

import styles from '../styles/module/About.module.scss';

const About: NextPage = () => {
  return (
    <BaseLayout title='About' crumbs={[homeCrumb]}>
      <div className={styles.about}>
        <h2 className={styles.top}>
          <div>Hi! I&#39;m</div>
          <div className={styles.title}>Teo Fumagalli</div>
        </h2>

        <Paragraph>
          I&#39;m a web designer and frontend developer from Buenos Aires, Argentina. I make and write stuff on the web, 
        </Paragraph>
      </div>
    </BaseLayout>
  );
};

export default About;
