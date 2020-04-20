import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import classNames from 'classnames';

export class DropdownPanel extends Component {
  static defaultProps = {
    appendTo: null,
    filter: null,
    onClick: null,
    panelClassName: null,
    panelStyle: null,
    scrollHeight: null
  };

  static propTypes = {
    appendTo: PropTypes.object,
    filter: PropTypes.any,
    onClick: PropTypes.func,
    panelClassName: PropTypes.string,
    panelStyle: PropTypes.object,
    scrollHeight: PropTypes.string
  };

  renderElement() {
    let className = classNames('p-dropdown-panel p-hidden p-input-overlay', this.props.panelClassName);

    return (
      <div ref={el => (this.element = el)} className={className} style={this.props.panelStyle} onClick={this.props.onClick}>
        {this.props.filter}
        <div
          ref={el => (this.itemsWrapper = el)}
          className="p-dropdown-items-wrapper"
          style={{ maxHeight: this.props.scrollHeight || 'auto' }}>
          <ul className="p-dropdown-items p-dropdown-list p-component" role="listbox">
            {this.props.children}
          </ul>
        </div>
      </div>
    );
  }

  render() {
    let element = this.renderElement();

    if (this.props.appendTo) return ReactDOM.createPortal(element, this.props.appendTo);
    else return element;
  }
}
