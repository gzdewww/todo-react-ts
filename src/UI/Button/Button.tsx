import type { ButtonHTMLAttributes, ReactNode } from "react";
import style from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  onClick,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      role="button"
      onClick={onClick}
      className={`${style.button} ${className ? className : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
