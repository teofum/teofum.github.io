import styles from '../styles/module/Radio.module.scss';

interface RadioProps {
  name: string;
  label?: string;
  options: { [value: string]: string };
  value: string;
  set: (v: string) => void;
}

const Radio = ({ name, label, options, value, set }: RadioProps) => {
  const optKeys = Object.keys(options || {});

  return (
    <div className={styles.radio}>
      {/* Semantically, this should be a fieldset, but it's basically impossible to style */}

      {label && <legend>{label}</legend>}
      <div>
        {optKeys.map((opt, i) => (
          <label key={i} className={styles.radioButton}>
            <input type='radio' name={name} value={opt}
              checked={value === opt}
              onChange={() => set(opt)} />
            <span className={styles.label}>{options[opt]}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Radio;