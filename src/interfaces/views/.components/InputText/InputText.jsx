import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import isNil from 'lodash/isNil';

import './InputText.css';

import { InputTextUtils } from './.tools/Utils/InputTextUtils';
import DomHandler from 'interfaces/views/.tools/Utils/DomHandler';
import ObjectUtils from 'interfaces/views/.tools/Utils/ObjectUtils';

export const InputText = ({ keyfilter, onInput, onKeyPress, validateOnly, ...rest }) => {
  const inputRef = useRef(null);

  const onPressKey = event => {
    if (onKeyPress) onKeyPress(event);
    if (keyfilter) InputTextUtils.onKeyPress(event, keyfilter, validateOnly);
  };

  const onInputClick = event => {
    let validatePattern = true;
    if (keyfilter && validateOnly) validatePattern = InputTextUtils.onValidate(event, keyfilter);
    if (onInput) onInput(event, validatePattern);

    if (!rest.onChange) {
      if (event.target.value.length > 0) DomHandler.addClass(event.target, 'p-filled');
      else DomHandler.removeClass(event.target, 'p-filled');
    }
  };

  const classNameList = classNames('p-inputtext p-component', rest.className, {
    'p-disabled': rest.disabled,
    'p-filled':
      (!isNil(rest.value) && rest.value.toString().length > 0) || (!isNil(rest.defaultValue) && rest.defaultValue.toString().length > 0)
  });

  let inputProps = ObjectUtils.findDiffKeys(rest, InputText.defaultProps);

  return <input ref={inputRef} {...inputProps} className={classNameList} onInput={onInputClick} onKeyPress={onPressKey} />;
};

InputText.propTypes = {
  keyfilter: PropTypes.any,
  onInput: PropTypes.func,
  onKeyPress: PropTypes.func,
  tooltip: PropTypes.string,
  tooltipOptions: PropTypes.object,
  validateOnly: PropTypes.bool
};

InputText.defaultProps = {
  keyfilter: null,
  onInput: null,
  onKeyPress: null,
  tooltip: null,
  tooltipOptions: null,
  validateOnly: false
};
