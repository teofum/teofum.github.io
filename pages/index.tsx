import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Teo Fumagalli</title>
      </Head>
      Nothing here! Go check out my <Link href='/articles/dither'>one article</Link>.

      Or <a href='https://teofum.github.io/dither'>cool stuff I made</a>.
    </div>
  );
};

export default Home;
