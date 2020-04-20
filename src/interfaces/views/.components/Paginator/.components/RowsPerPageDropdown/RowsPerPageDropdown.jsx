import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from 'interfaces/views/.components/Dropdown';

export const RowsPerPageDropdown = ({ onChange, options, value }) => {
  if (options) {
    let optionList = options.map((opt, i) => {
      return { label: String(opt), value: opt };
    });

    return <Dropdown value={value} options={optionList} onChange={onChange} />;
  } else return null;
};

RowsPerPageDropdown.propTypes = { onChange: PropTypes.func, options: PropTypes.array, value: PropTypes.number };

RowsPerPageDropdown.defaultProps = { onChange: null, options: null, value: null };
