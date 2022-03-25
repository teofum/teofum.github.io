import { useState, useEffect } from 'react';
import cn from 'classnames';

import ExpandToggle from './ExpandToggle';
import ThemeToggle from './ThemeToggle';
import FontToggle from './FontToggle';

import styles from '../styles/module/Settings.module.scss';

const Settings = () => {
  const [dark, setDark] = useState(false);
  const [serif, setSerif] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setDark(
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }, []);

  useEffect(() => {
    document.documentElement.className = cn({
      dark: dark,
      serif: serif
    });
  }, [dark, serif]);

  return (
    <div className={styles.anchor}>
      <div className={cn(
        styles.container,
        { [ styles.expanded ]: expanded }
      )}>
        <button className={styles.expandToggle}
          onClick={() => setExpanded(!expanded)}>
          <ExpandToggle toggled={expanded} />
        </button>

        <button onClick={() => setDark(!dark)} style={{ '--n': 1 } as any}>
          <ThemeToggle toggled={dark} />
        </button>

        <button onClick={() => setSerif(!serif)} style={{ '--n': 2 } as any}>
          <FontToggle toggled={serif} />
        </button>
      </div>
    </div>
  );
};

export default Settings;