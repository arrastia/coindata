import React, { forwardRef, Fragment } from 'react';

import styles from './Button.module.scss';

export const Button = forwardRef(({ children, className, disabled, label }, ref) => {
  const renderIcon = () => (children ? <span className={styles.icon}>{children}</span> : <Fragment />);
  const renderLabel = () => (label ? <span className={styles.text}>{label}</span> : <Fragment />);

  return (
    <button className={`${styles.button} ${className} ${disabled ? styles.disabled : undefined}`} ref={ref}>
      {renderIcon()}
      {renderLabel()}
    </button>
  );
});
