/* eslint-disable @typescript-eslint/no-var-requires */
import Link from 'next/link';

import BaseLayout from '../layout/BaseLayout';
import { homeCrumb } from '../types/Crumbs';

import commonStyles from '../styles/module/Common.module.scss';

type ArticlesProps = {
  articles: { title: string, path: string }[]
};

const Articles = ({ articles }: ArticlesProps) => {
  return (
    <BaseLayout title='Articles' crumbs={[ homeCrumb ]}>
      <div className={commonStyles.bigLinks}>
        {articles.map((art, i) => (
          <Link key={i} href={art.path}>{art.title}</Link>
        ))}
      </div>
    </BaseLayout>
  );
};

export const getStaticProps = async () => {
  const articles = [
    {
      title: 'Dithering: a visual introduction',
      path: '/articles/dither'
    }
  ];

  return {
    props: {
      articles
    }
  };
};

export default Articles;
