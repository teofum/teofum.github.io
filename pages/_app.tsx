import '../styles/globals.scss';
import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';

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
      <Component {...pageProps} />
    </SettingsCtx.Provider>
  );
}

export default MyApp;
