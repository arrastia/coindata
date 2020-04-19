import React from 'react';

import PropTypes from 'prop-types';

import { FiSearch, FiX } from 'react-icons/fi';

import { Checkbox } from 'interfaces/views/.components/Checkbox';
import { InputText } from 'interfaces/views/.components/InputText';

export const MultiSelectHeader = ({ allChecked, filter, filterPlaceholder, filterValue, onClose, onFilter, onToggleAll }) => {
  const filterData = event => {
    if (onFilter) {
      onFilter({
        originalEvent: event,
        query: event.target.value
      });
    }
  };

  const renderFilterElement = () => {
    if (filter) {
      return (
        <div className="p-multiselect-filter-container">
          <InputText
            type="text"
            role="textbox"
            value={filterValue}
            onChange={filterData}
            className="p-inputtext p-component"
            placeholder={filterPlaceholder}
          />
          <span className="p-multiselect-filter-icon">
            <FiSearch />
          </span>
        </div>
      );
    } else return null;
  };

  const toggleAll = event => {
    if (onToggleAll) {
      onToggleAll({
        originalEvent: event,
        checked: allChecked
      });
    }
  };

  let filterElement = renderFilterElement();

  return (
    <div className="p-multiselect-header">
      <Checkbox aria-checked={allChecked} checked={allChecked} onChange={toggleAll} role="checkbox" />
      {filterElement}
      <button className="p-multiselect-close p-link" onClick={onClose} type="button">
        <span className="p-multiselect-close-icon">
          <FiX />
        </span>
      </button>
    </div>
  );
};

MultiSelectHeader.defaultProps = {
  allChecked: false,
  filter: false,
  filterPlaceholder: null,
  filterValue: null,
  onClose: null,
  onFilter: null,
  onToggleAll: null
};

MultiSelectHeader.propTypes = {
  allChecked: PropTypes.bool,
  filter: PropTypes.bool,
  filterPlaceholder: PropTypes.string,
  filterValue: PropTypes.string,
  onClose: PropTypes.func,
  onFilter: PropTypes.func,
  onToggleAll: PropTypes.func
};
