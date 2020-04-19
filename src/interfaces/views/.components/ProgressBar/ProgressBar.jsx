import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ProgressBar.css';

export const ProgressBar = ({ className, displayValueTemplate, id, mode, showValue, style, unit, value }) => {
  const renderLabel = () => {
    if (showValue && value != null) {
      let label = displayValueTemplate ? displayValueTemplate(value) : value + unit;
      return <div className="p-progressbar-label">{label}</div>;
    } else {
      return null;
    }
  };

  const renderDeterminate = () => {
    let classNameList = classNames('p-progressbar p-component p-progressbar-determinate', className);
    let label = renderLabel();

    return (
      <div
        role="progressbar"
        id={id}
        className={classNameList}
        style={style}
        aria-valuemin="0"
        aria-valuenow={value}
        aria-valuemax="100"
        aria-label={value}>
        <div
          className="p-progressbar-value p-progressbar-value-animate"
          style={{ width: value + '%', display: 'block' }}></div>
        {label}
      </div>
    );
  };

  const renderIndeterminate = () => {
    let classNameList = classNames('p-progressbar p-component p-progressbar-indeterminate', className);

    return (
      <div role="progressbar" id={id} className={classNameList} style={style}>
        <div className="p-progressbar-indeterminate-container">
          <div className="p-progressbar-value p-progressbar-value-animate"></div>
        </div>
      </div>
    );
  };

  if (mode === 'determinate') return renderDeterminate();
  else if (mode === 'indeterminate') return renderIndeterminate();
  else
    throw new Error(
      mode + " is not a valid mode for the ProgressBar. Valid values are 'determinate' and 'indeterminate'"
    );
};

ProgressBar.propTypes = {
  className: PropTypes.string,
  displayValueTemplate: PropTypes.func,
  id: PropTypes.string,
  mode: PropTypes.string,
  showValue: PropTypes.bool,
  style: PropTypes.object,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

ProgressBar.defaultProps = {
  className: null,
  displayValueTemplate: null,
  id: null,
  mode: 'determinate',
  showValue: true,
  style: null,
  unit: '%',
  value: null
};
