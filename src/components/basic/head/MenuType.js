import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

export default class MenuType extends React.Component {
  static propTypes = {
    menuType: PropTypes.string.isRequired,
    changeType: PropTypes.func.isRequired,
  }
  render() {
    return <Icon
      style={{ fontSize: 20, verticalAlign: 'middle', marginRight: 10 }}
      type={`border-${this.props.menuType}`}
      onClick={() => {
        var theme = JSON.parse(localStorage.getItem(window.location.origin + (window.ctxPath || '/') + 'color.less:vars'));
        this.props.changeType(this.props.menuType === 'left' ? 'top' : 'left');
        const value = this.props.menuType === 'left' ? '48px' : '0px';
        window.less.modifyVars({ ...theme,
          '@extraPx': value,
        });
      }}
    />;
  }
}