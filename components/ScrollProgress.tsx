import { useEffect, useState } from 'react';

import styles from '../styles/module/ScrollProgress.module.scss';

const ScrollProgress = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const scrollHandler = () => {
      const bodyHeight = document.body.getBoundingClientRect().height;
      const max = bodyHeight - window.innerHeight;
      const scroll = window.scrollY;

      setValue(scroll / max * 100);
    };

    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return <progress className={styles.progress} max={100} value={value} />;
};

export default ScrollProgress;