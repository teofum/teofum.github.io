import '../styles/globals.scss';
import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';

import transitionStyles from '../styles/module/Transition.module.scss';
import { useRouter } from 'next/router';

export const SettingsCtx = React.createContext<{
  dark: boolean,
  setDark: (v: boolean) => void,
  serif: boolean,
  setSerif: (v: boolean) => void
}>({
  dark: false,
  setDark: () => { return; },
  serif: false,
  setSerif: () => { return; }
});

function MyApp({ Component, pageProps }: AppProps) {
  const [dark, setDark] = useState(false);
  const [serif, setSerif] = useState(false);

  const { pathname } = useRouter();

  useEffect(() => {
    setDark(
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }, []);

  useEffect(() => {
    const html = document.documentElement;

    if (dark) {
      html.classList.remove('light');
      html.classList.add('dark');
    }
    else {
      html.classList.remove('dark');
      html.classList.add('light');
    }

    if (serif) html.classList.add('serif');
    else html.classList.remove('serif');
  }, [dark, serif]);

  return (
    <SettingsCtx.Provider value={{ dark, setDark, serif, setSerif }}>
      <TransitionGroup>
        <CSSTransition key={pathname} timeout={15000}
          classNames={{ ...transitionStyles }}>
          <Component {...pageProps} />
        </CSSTransition>
      </TransitionGroup>
    </SettingsCtx.Provider>
  );
}

export default MyApp;
