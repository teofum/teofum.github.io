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
  setDark: () => {return;},
  serif: false,
  setSerif: () => {return;}
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

    if (dark) html.classList.add('dark');
    else html.classList.remove('dark');

    if (serif) html.classList.add('serif');
    else html.classList.remove('serif');

    // Enable transitions with a delay, removes the white flash on load with dark theme
    setTimeout(() => html.classList.remove('no-transitions'), 500);
  }, [dark, serif]);
  
  return (
    <SettingsCtx.Provider value={{ dark, setDark, serif, setSerif }}>
      <Component {...pageProps} />
    </SettingsCtx.Provider>
  );
}

export default MyApp;
