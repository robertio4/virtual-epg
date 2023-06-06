import styles from "./Checkbox.module.css";

type CheckboxProps = {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

const Checkbox = ({ id, checked, onChange, label }: CheckboxProps) => {
  return (
    <div className={styles.container}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={id}>
        <span>{label}</span>
        <span></span>
      </label>
    </div>
  );
};

export default Checkbox;
