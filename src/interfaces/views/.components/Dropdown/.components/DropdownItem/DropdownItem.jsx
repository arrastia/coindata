import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

export const DropdownItem = ({ disabled, label, onClick, option, selected, template }) => {
  const onItemClick = event => {
    if (onClick) onClick({ originalEvent: event, option: option });
  };

  let className = classNames(option.className, 'p-dropdown-item', {
    'p-highlight': selected,
    'p-disabled': disabled,
    'p-dropdown-item-empty': !label || label.length === 0
  });
  let content = template ? template(option) : label;

  return (
    <li aria-label={label} aria-selected={selected} className={className} key={label} onClick={onItemClick} role="option">
      {content}
    </li>
  );
};

DropdownItem.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.any,
  onClick: PropTypes.func,
  option: PropTypes.any,
  selected: PropTypes.bool,
  template: PropTypes.func
};

DropdownItem.defaultProps = { disabled: false, label: null, onClick: null, option: null, selected: false, template: null };
