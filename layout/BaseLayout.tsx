import Head from 'next/head';
import cn from 'classnames';

import Crumb from '../types/Crumbs';
import Crumbs from '../components/Crumbs';
import Settings, { defaultSettings, SettingsOptions } from '../components/Settings';

import commonStyles from '../styles/module/Common.module.scss';

interface BaseLayoutProps {
  title: string;
  crumbs?: Crumb[];
  settings?: SettingsOptions;
  children: React.ReactNode;
}

const BaseLayout = ({ title, crumbs, settings, children }: BaseLayoutProps) => {
  const showSettings = settings || defaultSettings;

  return (
    <div className={commonStyles.layoutRoot}>
      <Head>
        <title>{title}</title>
      </Head>
      <header className={cn(commonStyles.mainContent, commonStyles.header)}>
        <div className={commonStyles.headerContent}>
          {crumbs && <Crumbs crumbs={crumbs} />}
          <h1>{title}</h1>
        </div>
      </header>

      <aside className={cn(commonStyles.mainContent, commonStyles.settings)}>
        <Settings show={showSettings} />
      </aside>

      <main className={commonStyles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default BaseLayout;