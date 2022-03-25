import cn from 'classnames';

import styles from '../styles/module/FontToggle.module.scss';

interface FontToggleProps {
  toggled: boolean;
}

const FontToggle = ({ toggled }: FontToggleProps) => {
  return (
    <div className={cn(
      styles.fontToggle,
      { [styles.toggled]: toggled }
    )}>
      <span className={styles.sans}>A</span>
      <span className={styles.serif}>A</span>
    </div>
  );
};

export default FontToggle;