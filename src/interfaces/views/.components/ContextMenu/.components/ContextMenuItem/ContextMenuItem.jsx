import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import DomHandler from 'interfaces/views/.tools/Utils/DomHandler';

export class ContextMenuItem extends Component {
  static defaultProps = {
    model: null,
    root: false,
    className: null,
    resetMenu: false,
    onLeafClick: null
  };

  static propTypes = {
    model: PropTypes.any,
    root: PropTypes.bool,
    className: PropTypes.string,
    resetMenu: PropTypes.bool,
    onLeafClick: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      activeItem: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.resetMenu === true) {
      return {
        activeItem: null
      };
    }

    return null;
  }

  onItemMouseEnter(event, item) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    this.setState({
      activeItem: item
    });
  }

  onItemClick(event, item) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (!item.url) {
      event.preventDefault();
    }

    if (item.command) {
      item.command({
        originalEvent: event,
        item: item
      });
    }

    if (!item.items) {
      this.props.onLeafClick(event);
    }
  }

  componentDidUpdate() {
    if (this.element.offsetParent) {
      this.position();
    }
  }

  position() {
    const parentItem = this.element.parentElement;
    const containerOffset = DomHandler.getOffset(this.element.parentElement);
    const viewport = DomHandler.getViewport();
    const sublistWidth = this.element.offsetParent ? this.element.offsetWidth : DomHandler.getHiddenElementOuterWidth(this.element);
    const itemOuterWidth = DomHandler.getOuterWidth(parentItem.children[0]);

    this.element.style.top = '0px';

    if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - DomHandler.calculateScrollbarWidth()) {
      this.element.style.left = -1 * sublistWidth + 'px';
    } else {
      this.element.style.left = itemOuterWidth + 'px';
    }
  }

  renderSeparator(index) {
    return <li key={'separator_' + index} className="p-menu-separator" role="separator"></li>;
  }

  renderIcon(item) {
    const className = classNames('p-menuitem-icon', item.icon);
    if (item.icon) {
      return <span className={className}></span>;
    } else {
      return null;
    }
  }

  renderSubmenuIcon(item) {
    if (item.items) {
      return <span className="p-submenu-icon pi pi-fw pi-caret-right"></span>;
    } else {
      return null;
    }
  }

  renderSubmenu(item) {
    if (item.items) {
      return <ContextMenuItem model={item.items} resetMenu={item !== this.state.activeItem} onLeafClick={this.props.onLeafClick} />;
    } else {
      return null;
    }
  }

  renderMenuitem(item, index) {
    const className = classNames(
      'p-menuitem',
      { 'p-menuitem-active': this.state.activeItem === item, 'p-disabled': item.disabled },
      item.className
    );
    const icon = this.renderIcon(item);
    const submenuIcon = this.renderSubmenuIcon(item);
    const submenu = this.renderSubmenu(item);

    return (
      <li
        key={item.label + '_' + index}
        role="none"
        className={className}
        style={item.style}
        onMouseEnter={event => this.onItemMouseEnter(event, item)}>
        <a
          href={item.url || '#'}
          className="p-menuitem-link"
          target={item.target}
          onClick={event => this.onItemClick(event, item, index)}
          role="menuitem"
          aria-haspopup={item.items != null}>
          {icon}
          <span className="p-menuitem-text">{item.label}</span>
          {submenuIcon}
        </a>
        {submenu}
      </li>
    );
  }

  renderItem(item, index) {
    if (item.separator) return this.renderSeparator(index);
    else return this.renderMenuitem(item, index);
  }

  renderMenu() {
    if (this.props.model) {
      return this.props.model.map((item, index) => {
        return this.renderItem(item, index);
      });
    } else {
      return null;
    }
  }

  render() {
    const className = classNames({ 'p-submenu-list': !this.props.root });
    const submenu = this.renderMenu();

    return (
      <ul ref={el => (this.element = el)} className={className}>
        {submenu}
      </ul>
    );
  }
}
