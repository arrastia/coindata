import React, { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './MultiSelect.css';

import { FiChevronDown } from 'react-icons/fi';

import { MultiSelectHeader } from './.components/MultiSelectHeader';
import { MultiSelectItem } from './.components/MultiSelectItem';
import { MultiSelectPanel } from './.components/MultiSelectPanel';

import { useOnClickOutside } from 'interfaces/views/.tools/Hooks/useOnClickOutside';

import DomHandler from 'interfaces/views/.tools/Utils/DomHandler';
import FilterUtils from 'interfaces/views/.tools/Utils/FilterUtils';
import ObjectUtils from 'interfaces/views/.tools/Utils/ObjectUtils';

export const MultiSelect = ({
  appendTo,
  ariaLabelledBy,
  className,
  dataKey,
  disabled,
  filter,
  filterBy,
  filterLocale,
  filterMatchMode,
  filterPlaceholder,
  fixedPlaceholder,
  id,
  inputId,
  itemTemplate,
  maxSelectedLabels,
  name,
  onBlur,
  onChange,
  onFocus,
  optionLabel,
  options,
  optionValue,
  placeholder,
  required,
  scrollHeight,
  selectedItemsLabel,
  selectedItemTemplate,
  style,
  tabIndex,
  value
}) => {
  const [filterState, setFilterState] = useState('');

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const selectRef = useRef(null);

  useOnClickOutside(containerRef, () => hide());

  useEffect(() => {
    checkValidity();
  }, [selectRef.current]);

  const alignPanel = () => {
    if (appendTo) {
      panelRef.current.element.style.minWidth = DomHandler.getWidth(containerRef.current) + 'px';
      DomHandler.absolutePosition(panelRef.current.element, containerRef.current);
    } else {
      DomHandler.relativePosition(panelRef.current.element, containerRef.current);
    }
  };

  const checkValidity = () => selectRef.current.checkValidity();

  const filterOptions = options => {
    let filterValue = filterState.trim().toLocaleLowerCase(filterLocale);
    let searchFields = filterBy ? filterBy.split(',') : [optionLabel || 'label'];
    return FilterUtils.filter(options, searchFields, filterValue, filterMatchMode, filterLocale);
  };

  const findLabelByValue = val => {
    let label = null;

    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      let optionValue = getOptionValue(option);

      if (ObjectUtils.equals(optionValue, val)) {
        label = getOptionLabel(option);
        break;
      }
    }

    return label;
  };

  const findNextItem = item => {
    let nextItem = item.nextElementSibling;

    if (nextItem) return !DomHandler.hasClass(nextItem, 'p-multiselect-item') ? findNextItem(nextItem) : nextItem;
    else return null;
  };

  const findPrevItem = item => {
    let prevItem = item.previousElementSibling;

    if (prevItem) return !DomHandler.hasClass(prevItem, 'p-multiselect-item') ? findPrevItem(prevItem) : prevItem;
    else return null;
  };

  const findSelectionIndex = values => {
    let index = -1;

    if (value) {
      for (let i = 0; i < value.length; i++) {
        if (ObjectUtils.equals(value[i], values, dataKey)) {
          index = i;
          break;
        }
      }
    }
    return index;
  };

  const getLabel = () => {
    let label;

    if (!isEmpty() && !fixedPlaceholder) {
      label = '';
      for (let i = 0; i < value.length; i++) {
        if (i !== 0) {
          label += ',';
        }
        label += findLabelByValue(value[i]);
      }

      if (value.length <= maxSelectedLabels) {
        return label;
      } else {
        return getSelectedItemsLabel();
      }
    }

    return label;
  };

  const getLabelContent = () => {
    if (selectedItemTemplate) {
      if (!isEmpty()) {
        if (value.length <= maxSelectedLabels) {
          return value.map((val, index) => <Fragment key={index}>{selectedItemTemplate(val)}</Fragment>);
        } else return getSelectedItemsLabel();
      } else return selectedItemTemplate();
    } else return getLabel();
  };

  const getOptionLabel = option => {
    return optionLabel ? ObjectUtils.resolveFieldData(option, optionLabel) : option['label'] !== undefined ? option['label'] : option;
  };

  const getOptionValue = option => {
    return optionValue ? ObjectUtils.resolveFieldData(option, optionValue) : option['value'] !== undefined ? option['value'] : option;
  };

  const getSelectedItemsLabel = () => {
    let pattern = /{(.*?)}/;
    if (pattern.test(selectedItemsLabel)) {
      return selectedItemsLabel.replace(selectedItemsLabel.match(pattern)[0], value.length + '');
    }

    return selectedItemsLabel;
  };

  const hasFilter = () => filterState && filterState.trim().length > 0;

  const hide = () => {
    DomHandler.addClass(panelRef.current.element, 'p-input-overlay-hidden');
    DomHandler.removeClass(panelRef.current.element, 'p-input-overlay-visible');

    setTimeout(() => {
      panelRef.current.element.style.display = 'none';
      DomHandler.removeClass(panelRef.current.element, 'p-input-overlay-hidden');
    }, 150);
  };

  const isAllChecked = visibleOptions => {
    if (hasFilter()) return value && visibleOptions && visibleOptions.length && value.length === visibleOptions.length;
    else return value && options && value.length === options.length;
  };

  const isEmpty = () => !value || value.length === 0;

  const isPanelClicked = event => panelRef.current && panelRef.current.element && panelRef.current.element.contains(event.target);

  const isSelected = option => findSelectionIndex(getOptionValue(option)) !== -1;

  const onBlurEvent = event => {
    DomHandler.removeClass(containerRef.current, 'p-focus');

    if (onBlur) onBlur(event);
  };

  const onClick = event => {
    if (disabled) return;

    if (!isPanelClicked(event)) {
      if (panelRef.current.element.offsetParent) hide();
      else {
        inputRef.current.focus();
        show();
      }
    }
  };

  const onCloseClick = event => {
    hide();
    event.preventDefault();
    event.stopPropagation();
  };

  const onFilter = event => setFilterState(event.query);

  const onFocusEvent = event => {
    DomHandler.addClass(containerRef.current, 'p-focus');

    if (onFocus) onFocus(event);
  };

  const onOptionClick = event => {
    let optionValue = getOptionValue(event.option);
    let selectionIndex = findSelectionIndex(optionValue);
    let newValue;

    if (selectionIndex !== -1) newValue = value.filter((val, i) => i !== selectionIndex);
    else newValue = [...(value || []), optionValue];

    updateModel(event.originalEvent, newValue);
  };

  const onOptionKeyDown = event => {
    let listItem = event.originalEvent.currentTarget;

    switch (event.originalEvent.which) {
      //down
      case 40:
        var nextItem = findNextItem(listItem);
        if (nextItem) {
          nextItem.focus();
        }

        event.originalEvent.preventDefault();
        break;

      //up
      case 38:
        var prevItem = findPrevItem(listItem);
        if (prevItem) {
          prevItem.focus();
        }

        event.originalEvent.preventDefault();
        break;

      //enter
      case 13:
        onOptionClick(event);
        event.originalEvent.preventDefault();
        break;

      default:
        break;
    }
  };

  const onToggleAll = event => {
    let newValue;

    if (event.checked) newValue = [];
    else {
      let optionList = hasFilter() ? filterOptions(options) : options;
      if (optionList) {
        newValue = [];
        for (let option of options) {
          newValue.push(getOptionValue(option));
        }
      }
    }

    updateModel(event.originalEvent, newValue);
  };

  const renderHeader = items => (
    <MultiSelectHeader
      filter={filter}
      filterValue={filterState}
      onFilter={onFilter}
      filterPlaceholder={filterPlaceholder}
      onClose={onCloseClick}
      onToggleAll={onToggleAll}
      allChecked={isAllChecked(items)}
    />
  );

  const renderHiddenSelect = () => {
    let selectedOptions = value
      ? value.map((option, index) => <option key={getOptionLabel(option) + '_' + index} selected value={getOptionValue(option)}></option>)
      : null;

    return (
      <div className="p-hidden-accessible p-multiselect-hidden-select">
        <select ref={selectRef} required={required} name={name} tabIndex="-1" aria-hidden="true" multiple>
          {selectedOptions}
        </select>
      </div>
    );
  };

  const renderLabel = () => {
    const empty = isEmpty();
    const content = getLabelContent();
    const classNameLabel = classNames('p-multiselect-label', {
      'p-placeholder': empty && placeholder,
      'p-multiselect-label-empty': empty && !placeholder && !selectedItemTemplate
    });

    return (
      <div className="p-multiselect-label-container">
        <label className={classNameLabel}>{content || placeholder || 'empty'}</label>
      </div>
    );
  };

  const show = () => {
    if (options && options.length) {
      panelRef.current.element.style.zIndex = String(DomHandler.generateZIndex());
      panelRef.current.element.style.display = 'block';

      setTimeout(() => {
        DomHandler.addClass(panelRef.current.element, 'p-input-overlay-visible');
        DomHandler.removeClass(panelRef.current.element, 'p-input-overlay-hidden');
      }, 1);

      alignPanel();
    }
  };

  const updateModel = (event, value) => {
    if (onChange) {
      onChange({
        originalEvent: event,
        value: value,
        stopPropagation: () => {},
        preventDefault: () => {},
        target: { name: name, id: id, value: value }
      });
    }
  };

  let classNameList = classNames('p-multiselect p-component', className, { 'p-disabled': disabled });
  let label = renderLabel();
  let hiddenSelect = renderHiddenSelect();
  let items = options;

  if (items) {
    if (hasFilter()) items = filterOptions(items);

    items = items.map((option, index) => {
      let optionLabel = getOptionLabel(option);

      return (
        <MultiSelectItem
          key={optionLabel + '_' + index}
          label={optionLabel}
          option={option}
          template={itemTemplate}
          selected={isSelected(option)}
          onClick={onOptionClick}
          onKeyDown={onOptionKeyDown}
          tabIndex={tabIndex}
        />
      );
    });
  }

  let header = renderHeader(items);

  return (
    <div id={id} className={classNameList} onClick={onClick} ref={containerRef} style={style}>
      {hiddenSelect}
      <div className="p-hidden-accessible">
        <input
          readOnly
          type="text"
          onFocus={onFocusEvent}
          onBlur={onBlurEvent}
          ref={inputRef}
          aria-haspopup="listbox"
          aria-labelledby={ariaLabelledBy}
          id={inputId}
        />
      </div>
      {label}
      <div className="p-multiselect-trigger">
        <span className="p-multiselect-trigger-icon p-c">
          <FiChevronDown />
        </span>
      </div>
      <MultiSelectPanel ref={panelRef} header={header} appendTo={appendTo} scrollHeight={scrollHeight}>
        {items}
      </MultiSelectPanel>
    </div>
  );
};

MultiSelect.propTypes = {
  appendTo: PropTypes.object,
  ariaLabelledBy: PropTypes.string,
  className: PropTypes.string,
  dataKey: PropTypes.string,
  disabled: PropTypes.bool,
  filter: PropTypes.bool,
  filterBy: PropTypes.string,
  filterLocale: PropTypes.string,
  filterMatchMode: PropTypes.string,
  filterPlaceholder: PropTypes.string,
  fixedPlaceholder: PropTypes.bool,
  id: PropTypes.string,
  inputId: PropTypes.string,
  itemTemplate: PropTypes.func,
  maxSelectedLabels: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  optionLabel: PropTypes.string,
  options: PropTypes.array,
  optionValue: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  scrollHeight: PropTypes.string,
  selectedItemsLabel: PropTypes.string,
  selectedItemTemplate: PropTypes.func,
  style: PropTypes.object,
  tabIndex: PropTypes.string,
  value: PropTypes.any
};

MultiSelect.defaultProps = {
  appendTo: null,
  ariaLabelledBy: null,
  className: null,
  dataKey: 'id',
  disabled: false,
  filter: false,
  filterBy: null,
  filterLocale: undefined,
  filterMatchMode: 'contains',
  filterPlaceholder: null,
  fixedPlaceholder: false,
  id: null,
  inputId: null,
  itemTemplate: null,
  maxSelectedLabels: 3,
  name: null,
  onBlur: null,
  onChange: null,
  onFocus: null,
  optionLabel: null,
  options: null,
  optionValue: null,
  placeholder: null,
  required: false,
  scrollHeight: '200px',
  selectedItemsLabel: '{0} items selected',
  selectedItemTemplate: null,
  style: null,
  tabIndex: '0',
  value: null
};
