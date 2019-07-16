import React, { Component } from 'react';
import { Tabs, Icon, Menu, Dropdown, Button } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import style from './style.module.css';
import Home from '../Home';
import sys from './sys';
import cars from './cars';
import channel from './channel';
import basis from './basis';
import operation from './operation';
import sales from './sales';

class ComponentsTabs extends Component {
static components = {
  Home,
  ...sys,
  ...cars,
  ...channel,
  ...basis,
  ...operation,
  ...sales,
}
static propTypes = {
  tabs: ImmutablePropTypes.list.isRequired,
  addTabsList: PropTypes.func.isRequired,
  removeTabsList: PropTypes.func.isRequired,
  reserveTabsList: PropTypes.func.isRequired,
  clearTabsList: PropTypes.func.isRequired,
  setMenuKey: PropTypes.func.isRequired,
}
onEdit(path, action) {
  if (this.props.history.location.pathname === path && action === 'remove') {
    const next = this.props.tabs.size === 1 ? '/Home' : (this.props.tabs.get(this.props.tabs.findIndex(item => item.get('path') === path) + 1) || this.props.tabs.get(this.props.tabs.findIndex(item => item.get('path') === path) - 1)).get('path');
    this.props.history.push(next);
  }
  this.props.removeTabsList(path);
}
onChange(path) {
  this.props.history.push(path);
}
dropDown() {
  return (
    <Dropdown overlay={this.menu()} trigger={['click']}>
      <Button>
        操作<Icon type="down" />
      </Button>
    </Dropdown>
  );
}
closeAll() {
  if (this.props.history.location.pathname !== '/Home') {
    this.props.history.push('/Home');
  }
  this.props.clearTabsList();
}
closeOther() {
  this.props.reserveTabsList(this.props.tabs.find(item => item.get('path') === this.props.history.location.pathname));
  this.props.setMenuKey(this.props.history.location.pathname);
}
menu() {
  return (
    <Menu>
      <Menu.Item onClick={this.closeAll.bind(this)}>关闭所有</Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={this.closeOther.bind(this)}>关闭其他</Menu.Item>
    </Menu>
  );
}
tab(item) {
  // console.log(item);
  return (
    item.icon ?
      <span><Icon type={item.icon}/><span>{item.breadcrumbName}</span></span> :
      <span>{item.breadcrumbName}</span>
  );
}
tabPane() {
  return (
    [{ path: '/Home', isLeaf: true, breadcrumbName: '首页', closable: false }].concat(this.props.tabs.toJS()).filter(v => v.isLeaf).map(item => (
      <Tabs.TabPane
        key={item.path}
        tab={this.tab(item)}
        closable={item.closable}
        className={style.layout}
      >
        {
          this.customComponent(item.path)
        }
      </Tabs.TabPane>
    ))
  );
}
customComponent(path) {
  const name = path.split('/')[path.split('/').length - 1];
  const SpecificComponent = ComponentsTabs.components[name];
  return SpecificComponent ?
    <SpecificComponent history={this.props.history} /> :
    <h3>404</h3>;
}
render() {
  return (
    <Tabs
      hideAdd
      type="editable-card"
      style={{ background: 'white' }}
      onEdit={this.onEdit.bind(this)}
      onChange={this.onChange.bind(this)}
      activeKey={this.props.history.location.pathname}
      tabBarStyle={{ marginBottom: 0, background: '#f0f2f5' }}
      tabBarExtraContent={this.props.tabs.size ? this.dropDown() : ''}
    >
      {
        this.tabPane()
      }
    </Tabs>
  );
}
}

export default ComponentsTabs;