import React, { Component } from 'react';
import style from './style.module.css';

class LayoutCommonBtns extends Component {
  render() {
    return <div style={this.props.style ? this.props.style : {}} className={style.box}>{this.props.children}</div>;
  }
}

export default LayoutCommonBtns;