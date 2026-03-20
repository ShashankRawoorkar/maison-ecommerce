import React from 'react';
import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) {
  const variantClass = {
    primary: styles.primary,
    outline: styles.outline,
    ghost: styles.ghost,
  }[variant] || styles.primary;

  return (
    <button
      type={type}
      className={`${styles.btn} ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
