import React, { forwardRef, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './Checkbox.css';

import { FiCheck } from 'react-icons/fi';

export const Checkbox = forwardRef(
  (
    {
      ariaLabelledBy,
      checked,
      className,
      disabled,
      id,
      inputId,
      name,
      onChange,
      onContextMenu,
      onMouseDown,
      readOnly,
      required,
      style,
      value
    },
    ref
  ) => {
    const [isFocus, setIsFocus] = useState(false);

    const boxRef = useRef(null);
    const inputRef = useRef(null);

    const isFocused = value => setIsFocus(value);

    const onClick = event => {
      if (!disabled && !readOnly && onChange) {
        onChange({
          originalEvent: event,
          value: value,
          checked: !checked,
          stopPropagation: () => {},
          preventDefault: () => {},
          target: {
            type: 'checkbox',
            name: name,
            id: id,
            value: value,
            checked: !checked
          }
        });

        inputRef.current.checked = !checked;
        inputRef.current.focus();

        event.preventDefault();
      }
    };

    const onKeyDown = event => {
      if (event.key === 'Enter') {
        onClick(event);
        event.preventDefault();
      }
    };

    let containerClass = classNames('p-checkbox p-component', className);
    let boxClass = classNames('p-checkbox-box p-component', {
      'p-highlight': checked,
      'p-disabled': disabled,
      'p-focus': isFocus
    });
    let iconClass = classNames('p-checkbox-icon p-c', { 'pi pi-check': checked });

    return (
      <div
        ref={ref}
        id={id}
        className={containerClass}
        style={style}
        onClick={onClick}
        onContextMenu={onContextMenu}
        onMouseDown={onMouseDown}>
        <div className="p-hidden-accessible">
          <input
            type="checkbox"
            aria-labelledby={ariaLabelledBy}
            ref={inputRef}
            id={inputId}
            name={name}
            defaultChecked={checked}
            onKeyDown={onKeyDown}
            onFocus={() => isFocused(true)}
            onBlur={() => isFocused(false)}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
          />
        </div>
        <div className={boxClass} ref={boxRef} role="checkbox" aria-checked={checked}>
          <span className={iconClass}>
            <FiCheck />
          </span>
        </div>
      </div>
    );
  }
);

Checkbox.propTypes = {
  ariaLabelledBy: PropTypes.string,
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  inputId: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onContextMenu: PropTypes.func,
  onMouseDown: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  style: PropTypes.object,
  tooltip: PropTypes.string,
  tooltipOptions: PropTypes.object,
  value: PropTypes.any
};

Checkbox.defaultProps = {
  ariaLabelledBy: null,
  checked: false,
  className: null,
  disabled: false,
  id: null,
  inputId: null,
  name: null,
  onChange: null,
  onContextMenu: null,
  onMouseDown: null,
  readOnly: false,
  required: false,
  style: null,
  tooltip: null,
  tooltipOptions: null,
  value: null
};
