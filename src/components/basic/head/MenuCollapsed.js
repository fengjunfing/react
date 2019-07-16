import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

const MenuCollapsed = ({ collapsed, setCollapsed }) => (
  <Icon
    className="trigger"
    style={{ cursor: 'pointer' }}
    type={collapsed ? 'menu-unfold' : 'menu-fold'}
    onClick={() => { setCollapsed(!collapsed); }}
  />
);

MenuCollapsed.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired
};

export default MenuCollapsed;