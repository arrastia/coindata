import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import styles from './Spinner.module.scss';

export const Spinner = ({ animationDuration, className, fill, id, strokeWidth, style }) => {
  let spinnerClass = classNames(styles.spinner, className);

  return (
    <div aria-busy={true} id={id} className={spinnerClass} role="alert" style={style}>
      <svg className={styles.svg} viewBox="25 25 50 50" style={{ animationDuration: animationDuration }}>
        <circle className={styles.circle} cx="50" cy="50" r="20" fill={fill} strokeWidth={strokeWidth} strokeMiterlimit="10" />
      </svg>
    </div>
  );
};

Spinner.propTypes = {
  animationDuration: PropTypes.string,
  className: PropTypes.string,
  fill: PropTypes.string,
  id: PropTypes.string,
  strokeWidth: PropTypes.string,
  style: PropTypes.object
};

Spinner.defaultProps = { animationDuration: '2s', className: null, fill: 'none', id: null, strokeWidth: '2', style: null };
