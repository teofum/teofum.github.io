import { useState, useContext } from 'react';
import cn from 'classnames';

import { SettingsCtx } from '../pages/_app';

import ExpandToggle from './ExpandToggle';
import ThemeToggle from './ThemeToggle';
import FontToggle from './FontToggle';

import styles from '../styles/module/Settings.module.scss';

export type SettingsOptions = ('theme' | 'font')[];
interface SettingsProps {
  show: SettingsOptions;
}

const Settings = ({ show }: SettingsProps) => {
  const {
    dark, setDark,
    serif, setSerif
  } = useContext(SettingsCtx);

  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.anchor}>
      <div className={cn(
        styles.container,
        { [styles.expanded]: show.length < 2 || expanded }
      )}>
        {show.length > 1 &&
          <button className={styles.expandToggle} aria-label='Open/close settings'
            onClick={() => setExpanded(!expanded)}>
            <ExpandToggle toggled={expanded} />
          </button>}

        {show.includes('theme') &&
          <button onClick={() => setDark(!dark)} aria-label='Theme toggle'
            style={{ '--n': 1 } as any}>
            <ThemeToggle toggled={dark} />
          </button>}

        {show.includes('font') &&
          <button onClick={() => setSerif(!serif)} aria-label='Font toggle'
            style={{ '--n': 2 } as any}>
            <FontToggle toggled={serif} />
          </button>}
      </div>
    </div>
  );
};

export default Settings;

export const defaultSettings: SettingsOptions = ['theme'];
export const articleSettings: SettingsOptions = ['theme', 'font'];