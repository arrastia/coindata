import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { FiChevronsLeft } from 'react-icons/fi';

export const FirstPageLink = ({ disabled, onClick }) => {
  let className = classNames('p-paginator-first p-paginator-element p-link', { 'p-disabled': disabled });

  return (
    <button className={className} disabled={disabled} onClick={onClick} type="button">
      <span className="p-paginator-icon">
        <FiChevronsLeft />
      </span>
    </button>
  );
};

FirstPageLink.propTypes = { disabled: PropTypes.bool, onClick: PropTypes.func };

FirstPageLink.defaultProps = { disabled: false, onClick: null };
