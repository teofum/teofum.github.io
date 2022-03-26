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
    const html = document.documentElement;
    
    if (dark) html.classList.add('dark');
    else html.classList.remove('dark');
    
    if (serif) html.classList.add('serif');
    else html.classList.remove('serif');

    // Enable transitions with a delay, removes the white flash on load with dark theme
    setTimeout(() => html.classList.remove('no-transitions'), 500);
  }, [dark, serif]);

  return (
    <div className={styles.anchor}>
      <div className={cn(
        styles.container,
        { [ styles.expanded ]: expanded }
      )}>
        <button className={styles.expandToggle} aria-label='Open/close settings'
          onClick={() => setExpanded(!expanded)}>
          <ExpandToggle toggled={expanded} />
        </button>

        <button onClick={() => setDark(!dark)} aria-label='Theme toggle'
          style={{ '--n': 1 } as any}>
          <ThemeToggle toggled={dark} />
        </button>

        <button onClick={() => setSerif(!serif)} aria-label='Font toggle'
          style={{ '--n': 2 } as any}>
          <FontToggle toggled={serif} />
        </button>
      </div>
    </div>
  );
};

export default Settings;