import Link from 'next/link';
import Crumb from '../types/Crumbs';

import styles from '../styles/module/Crumbs.module.scss';

interface CrumbsProps {
  crumbs: Crumb[];
}

const Crumbs = ({ crumbs }: CrumbsProps) => {
  return (
    <nav className={styles.crumbs}>
      {crumbs.map((crumb, i) => (
        <span key={i} className={styles.crumb}>
          <Link href={crumb.path}>{crumb.name}</Link>
          /
        </span>
      ))}
    </nav>
  );
};

export default Crumbs;