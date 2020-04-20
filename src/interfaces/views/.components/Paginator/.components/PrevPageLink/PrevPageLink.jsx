import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { FiChevronLeft } from 'react-icons/fi';

export const PrevPageLink = ({ disabled, onClick }) => {
  let className = classNames('p-paginator-prev p-paginator-element p-link', { 'p-disabled': disabled });

  return (
    <button className={className} disabled={disabled} onClick={onClick} type="button">
      <span className="p-paginator-icon">
        <FiChevronLeft />
      </span>
    </button>
  );
};

PrevPageLink.propTypes = { disabled: PropTypes.bool, onClick: PropTypes.func };

PrevPageLink.defaultProps = { disabled: false, onClick: null };
