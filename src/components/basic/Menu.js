import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
const { SubMenu: Parent, Item: Leaf } = Menu;

class ComponentsMenu extends Component {
  static propTypes = {
    menu: PropTypes.object.isRequired,
    menuType: PropTypes.string.isRequired,
    menuKey: PropTypes.array.isRequired,
    setMenuKey: PropTypes.func.isRequired,
  }
  toLink(url) {
    if (this.props.location.pathname !== url) {
      this.props.history.push(url);
    }
  }
  createTreeNode(menu) {
    return (
      menu.icon ?
        <React.Fragment><Icon type={menu.icon} /><span>{menu.name}</span></React.Fragment> :
        <span>{menu.name}</span>
    );
  }
  renderTree(data) {
    return data.map((menu) => {
      if (!menu.isLeaf) {
        return (
          <Parent
            key={menu.url}
            title={this.createTreeNode(menu)}
            onTitleClick={ () => {
              this.props.setMenuKey.bind(this, this.props.menuKey[0] ? this.props.menuKey[this.props.menuKey.length - menu.customLevel] === menu.url ? this.props.menuKey[this.props.menuKey.length - menu.customLevel + 1] || '' : this.props.history.location.pathname.search(menu.url) > -1 ? this.props.history.location.pathname : menu.url : this.props.history.location.pathname.search(menu.url) > -1 ? this.props.history.location.pathname : menu.url)(); }
            }>
            {
              this.renderTree(menu.children)
            }
          </Parent>
        );
      } else {
        return (
          <Leaf key={menu.url} onClick={this.toLink.bind(this, menu.url)}>
            {
              this.createTreeNode(menu)
            }
          </Leaf>
        );
      }
    });
  }
  render() {
    const extraAttr = {};
    if (this.props.menuType === 'left') {
      this.props.menu.get('collapsed') ?
        extraAttr.defaultOpenKeys = this.props.menu.size ? [] : this.props.menu.get('key') :
        extraAttr.openKeys = this.props.menu.get('key');
    }
    return (
      <React.Fragment>
        {
          <Menu
            theme={this.props.menuType === 'left' ? 'dark' : 'light'}
            mode={this.props.menuType === 'left' ? 'inline' : 'horizontal'}
            selectedKeys={[this.props.menu.get('key')[0]]}
            {...extraAttr}
          >
            {
              this.renderTree(this.props.menu.getIn(['list', 'data']).toJS())
            }
          </Menu>
        }
      </React.Fragment>
    );
  }
}

export default ComponentsMenu;