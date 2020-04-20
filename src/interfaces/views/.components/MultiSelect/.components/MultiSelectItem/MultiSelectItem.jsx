import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { FiCheck } from 'react-icons/fi';

export const MultiSelectItem = ({ label, onClick, onKeyDown, option, selected, tabIndex, template }) => {
  const onClickEvent = event => {
    if (onClick) onClick({ originalEvent: event, option: option });
    event.preventDefault();
  };

  const onKeyDownEvent = event => {
    if (onKeyDown) onKeyDown({ originalEvent: event, option: option });
  };

  const className = classNames(option.className, 'p-multiselect-item', {
    'p-highlight': selected
  });
  const checkboxClassName = classNames('p-checkbox-box p-component', { 'p-highlight': selected });
  const checkboxIcon = classNames('p-checkbox-icon p-c', { 'pi pi-check': selected });
  const content = template ? template(option) : label;

  return (
    <li aria-selected={selected} className={className} onClick={onClickEvent} onKeyDown={onKeyDownEvent} role="option" tabIndex={tabIndex}>
      <div className="p-checkbox p-component">
        <div className={checkboxClassName}>
          <span className={checkboxIcon}>
            <FiCheck />
          </span>
        </div>
      </div>
      <label>{content}</label>
    </li>
  );
};

MultiSelectItem.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  option: PropTypes.object,
  selected: PropTypes.bool,
  tabIndex: PropTypes.string,
  template: PropTypes.func
};

MultiSelectItem.defaultProps = {
  label: null,
  onClick: null,
  onKeyDown: null,
  option: null,
  selected: false,
  tabIndex: null,
  template: null
};
