import React, { useState } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

// import './RowCheckbox.css';

import { FiCheck } from 'react-icons/fi';

export const RowCheckbox = ({ disabled, onClick, rowData, selected }) => {
  const [isFocus, setIsFocus] = useState(false);

  const onBlur = () => setIsFocus(false);

  const onClickEvent = event => {
    if (onClick && !disabled) onClick({ originalEvent: event, data: rowData, checked: selected });
  };

  const onFocus = () => setIsFocus(true);

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      onClick(event);
      event.preventDefault();
    }
  };

  let className = classNames('p-checkbox-box p-component', { 'p-highlight': selected, 'p-disabled': disabled, 'p-focus': isFocus });
  let iconClassName = classNames('p-checkbox-icon p-clickable', { 'pi pi-check': selected });

  return (
    <div className="p-checkbox p-component" onClick={onClickEvent}>
      <div className="p-hidden-accessible">
        <input
          aria-checked={selected}
          defaultChecked={selected}
          disabled={disabled}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          type="checkbox"
        />
      </div>
      <div className={className} role="checkbox" aria-checked={selected}>
        <span className={iconClassName}>{selected && <FiCheck />}</span>
      </div>
    </div>
  );
};

RowCheckbox.propTypes = { disabled: PropTypes.bool, onClick: PropTypes.func, rowData: PropTypes.object };

RowCheckbox.defaultProps = { disabled: false, onClick: null, rowData: null };
