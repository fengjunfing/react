import React from 'react';
import { Menu, Dropdown, Icon, Avatar } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const menu = (show, logout) => {
  return (
    <Menu>
      <Menu.Item onClick={show}>用户详情</Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={logout}>退出登录</Menu.Item>
    </Menu>
  );
};

const UserDropdown = ({ show, logout, userCenterData, parent }) => (
  <Dropdown overlay={menu(show, logout.bind(parent))} trigger={['click']}>
    <a style={{ float: 'right' }}>
      {userCenterData.get('name')}
      <Icon type="down" />
      <Avatar style={{ margin: '-6px 0 0 6px' }} src={userCenterData.get('headPortrait')} />
    </a>
  </Dropdown>
);

UserDropdown.propTypes = {
  show: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  userCenterData: ImmutablePropTypes.map.isRequired,
};

export default UserDropdown;