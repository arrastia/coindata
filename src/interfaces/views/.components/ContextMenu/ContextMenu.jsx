import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './ContextMenu.scss';

import { ContextMenuItem } from './.components/ContextMenuItem';

import DomHandler from 'interfaces/views/.tools/Utils/DomHandler';

export class ContextMenu extends Component {
  static defaultProps = {
    appendTo: null,
    autoZIndex: true,
    baseZIndex: 0,
    className: null,
    global: false,
    id: null,
    model: null,
    onHide: null,
    onShow: null,
    style: null
  };

  static propTypes = {
    appendTo: PropTypes.any,
    autoZIndex: PropTypes.bool,
    baseZIndex: PropTypes.number,
    className: PropTypes.string,
    global: PropTypes.bool,
    id: PropTypes.string,
    model: PropTypes.array,
    onHide: PropTypes.func,
    onShow: PropTypes.func,
    style: PropTypes.object
  };

  constructor(props) {
    super();
    this.state = {
      resetMenu: false
    };
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onLeafClick = this.onLeafClick.bind(this);
    this.onMenuMouseEnter = this.onMenuMouseEnter.bind(this);
  }

  componentDidMount() {
    if (this.props.global) {
      this.bindDocumentContextMenuListener();
    }
  }

  onMenuClick() {
    this.setState({
      resetMenu: false
    });
  }

  onMenuMouseEnter() {
    this.setState({
      resetMenu: false
    });
  }

  show(event) {
    this.container.style.display = 'block';
    this.position(event);
    if (this.props.autoZIndex) {
      this.container.style.zIndex = String(this.props.baseZIndex + DomHandler.generateZIndex());
    }
    DomHandler.fadeIn(this.container, 250);

    this.bindDocumentClickListener();
    this.bindDocumentResizeListener();

    if (this.props.onShow) {
      this.props.onShow(event);
    }

    event.stopPropagation();
    event.preventDefault();
  }

  hide(event) {
    if (this.container) {
      this.container.style.display = 'none';
    }

    if (this.props.onHide) {
      this.props.onHide(event);
    }

    this.unbindDocumentResizeListener();
    this.unbindDocumentClickListener();
  }

  position(event) {
    if (event) {
      let left = event.pageX + 1;
      let top = event.pageY + 1;
      let width = this.container.offsetParent ? this.container.offsetWidth : DomHandler.getHiddenElementOuterWidth(this.container);
      let height = this.container.offsetParent ? this.container.offsetHeight : DomHandler.getHiddenElementOuterHeight(this.container);
      let viewport = DomHandler.getViewport();

      //flip
      if (left + width - document.body.scrollLeft > viewport.width) {
        left -= width;
      }

      //flip
      if (top + height - document.body.scrollTop > viewport.height) {
        top -= height;
      }

      //fit
      if (left < document.body.scrollLeft) {
        left = document.body.scrollLeft;
      }

      //fit
      if (top < document.body.scrollTop) {
        top = document.body.scrollTop;
      }

      this.container.style.left = left + 'px';
      this.container.style.top = top + 'px';
    }
  }

  onLeafClick(event) {
    this.setState({
      resetMenu: true
    });

    this.hide(event);

    event.stopPropagation();
  }

  isOutsideClicked(event) {
    return this.container && !(this.container.isSameNode(event.target) || this.container.contains(event.target));
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = event => {
        if (this.isOutsideClicked(event) && event.button !== 2) {
          this.hide(event);

          this.setState({
            resetMenu: true
          });
        }
      };

      document.addEventListener('click', this.documentClickListener);
    }
  }

  bindDocumentContextMenuListener() {
    if (!this.documentContextMenuListener) {
      this.documentContextMenuListener = event => {
        this.show(event);
      };

      document.addEventListener('contextmenu', this.documentContextMenuListener);
    }
  }

  bindDocumentResizeListener() {
    if (!this.documentResizeListener) {
      this.documentResizeListener = event => {
        if (this.container.offsetParent) {
          this.hide(event);
        }
      };

      window.addEventListener('resize', this.documentResizeListener);
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener);
      this.documentClickListener = null;
    }
  }

  unbindDocumentContextMenuListener() {
    if (this.documentContextMenuListener) {
      document.removeEventListener('contextmenu', this.documentContextMenuListener);
      this.documentContextMenuListener = null;
    }
  }

  unbindDocumentResizeListener() {
    if (this.documentResizeListener) {
      window.removeEventListener('resize', this.documentResizeListener);
      this.documentResizeListener = null;
    }
  }

  componentWillUnmount() {
    this.unbindDocumentClickListener();
    this.unbindDocumentResizeListener();
    this.unbindDocumentContextMenuListener();
  }

  renderContextMenu() {
    const className = classNames('p-contextmenu p-component', this.props.className);

    return (
      <div
        id={this.props.id}
        className={className}
        style={this.props.style}
        ref={el => (this.container = el)}
        onClick={this.onMenuClick}
        onMouseEnter={this.onMenuMouseEnter}>
        <ContextMenuItem model={this.props.model} root={true} resetMenu={this.state.resetMenu} onLeafClick={this.onLeafClick} />
      </div>
    );
  }

  render() {
    const element = this.renderContextMenu();

    if (this.props.appendTo) return ReactDOM.createPortal(element, this.props.appendTo);
    else return element;
  }
}
