import cn from 'classnames';

import styles from '../styles/module/ExpandToggle.module.scss';

interface ExpandToggleProps {
  toggled: boolean;
}

const ExpandToggle = ({ toggled }: ExpandToggleProps) => {
  return (
    <div className={cn(
      styles.expandToggle,
      { [styles.toggled]: toggled }
    )}>
      <span style={{ '--n': -1 } as any} />
      <span style={{ '--n': 0 } as any} />
      <span style={{ '--n': 1 } as any} />
    </div>
  );
};

export default ExpandToggle;