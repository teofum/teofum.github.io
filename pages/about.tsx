import type { NextPage } from 'next';

import BaseLayout from '../layout/BaseLayout';
import Paragraph from '../components/Paragraph';
import { homeCrumb } from '../types/Crumbs';

import styles from '../styles/module/About.module.scss';
import Link from 'next/link';
import ThatsMeSVG from '../components/about/ThatsMeSVG';
import Anchor from '../components/Anchor';

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
            I don&#39;t do social media, but you can find my stuff on <Link href='/projects'>my projects page</Link>, its source code (and this website&#39;s!) on <Anchor href='https://github.com/teofum'>GitHub</Anchor>, or <a href='mailto:teo.fum@outlook.com'>email me</a> if you want to chat. Thanks for checking out my site, and have a nice day :)
          </Paragraph>
        </div>
        <div className={styles.image}>
          <ThatsMeSVG />
          <picture>
            <source srcSet='/content/about/portrait.webp' type='image/webp' />
            <source srcSet='/content/about/portrait.png' type='image/png' />
            <img src='/content/about/portrait.png' alt='Me :)' />
          </picture>
        </div>
      </div>
    </BaseLayout>
  );
};

export default About;
