import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function Input({
  value,
  placeholder,
  error,
  onChange,
  className,
  ...props
}: InputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={error || placeholder}
      aria-invalid={Boolean(error)}
      className={`${styles.input} ${
        error ? styles["input--error"] : ""
      } ${className}`}
      {...props}
    />
  );
}
