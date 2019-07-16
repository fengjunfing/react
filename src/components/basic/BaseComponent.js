//baseComponent.js   component的基类方法
 
import React from 'react';
import {is} from 'immutable';
 
class BaseComponent extends React.Component { 
  shouldComponentUpdate(nextProps) {
    const thisProps = this.props || {};
    for (const key in nextProps) {
      if (!is(thisProps[key], nextProps[key])) {
        return true;
      }
    }
    return false;
  }
}

export default BaseComponent;
