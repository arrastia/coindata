import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { FiChevronsRight } from 'react-icons/fi';

export const LastPageLink = ({ disabled, onClick }) => {
  let className = classNames('p-paginator-last p-paginator-element p-link', { 'p-disabled': disabled });

  return (
    <button className={className} disabled={disabled} onClick={onClick} type="button">
      <span className="p-paginator-icon">
        <FiChevronsRight />
      </span>
    </button>
  );
};

LastPageLink.propTypes = { disabled: PropTypes.bool, onClick: PropTypes.func };

LastPageLink.defaultProps = { disabled: false, onClick: null };
