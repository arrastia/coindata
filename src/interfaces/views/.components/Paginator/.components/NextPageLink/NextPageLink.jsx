import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { FiChevronRight } from 'react-icons/fi';

export const NextPageLink = ({ disabled, onClick }) => {
  let className = classNames('p-paginator-next p-paginator-element p-link', { 'p-disabled': disabled });

  return (
    <button className={className} disabled={disabled} onClick={onClick} type="button">
      <span className="p-paginator-icon">
        <FiChevronRight />
      </span>
    </button>
  );
};

NextPageLink.propTypes = { disabled: PropTypes.bool, onClick: PropTypes.func };

NextPageLink.defaultProps = { disabled: false, onClick: null };
