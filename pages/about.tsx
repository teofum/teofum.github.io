import type { NextPage } from 'next';

import BaseLayout from '../layout/BaseLayout';
import Paragraph from '../components/Paragraph';
import { homeCrumb } from '../types/Crumbs';

import styles from '../styles/module/About.module.scss';
import Link from 'next/link';

const About: NextPage = () => {
  return (
    <BaseLayout title='About' crumbs={[homeCrumb]}>
      <div className={styles.about}>
        <div className={styles.content}>
          <h2 className={styles.top}>
            <div>Hi! I&#39;m</div>
            <div className={styles.title}>Teo Fumagalli</div>
          </h2>

          <Paragraph>
            I&#39;m a web designer and frontend developer from Buenos Aires, Argentina. I make and write stuff on the web, trying out some of the fun things websites (and computers) can do and explaining how they work.
          </Paragraph>

          <Paragraph>
            I don&#39;t do social media, but you can find my stuff on <Link href='/projects'>my projects page</Link>, its source code (and this website&#39;s!) on <a href='https://github.com/teofum'>GitHub</a> and <a href='mailto:teo.fum@outlook.com'>email me</a> if you have something you want to say. Thanks for checking out my site, and have a nice day :)
          </Paragraph>
        </div>
        <div className={styles.image}>
          <picture>
            <source srcSet='/content/about/me.webp' type='image/webp' />
            <source srcSet='/content/about/me.png' type='image/png' />
            <img src='/content/about/me.png' alt='Me :)' />
          </picture>
        </div>
      </div>
    </BaseLayout>
  );
};

export default About;
