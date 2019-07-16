import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '@/images/logo.png';
import { project_name, project_name_s } from '@/publicData/config';

const ComponentsLogo = ({ collapsed, menuType }) => (
  <div style={{ textAlign: 'center', marginTop: 8 }}>
    <Link to={'/Home'} style={
      menuType === 'left' ? 
        { color: 'white', display: 'inline-block', margin: '38px 0 20px'} :
        { color: '#000000a6', display: 'inline-block', margin: '5px 0'}
    }>
      <img src={logo} />
      <p style={{ margin: menuType === 'left' ? '20px 0 0' : '10px 0 0'}}>
        {
          collapsed ? project_name_s : project_name
        }
      </p>
    </Link>
  </div>
);

ComponentsLogo.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  menuType: PropTypes.string.isRequired,
};

export default ComponentsLogo;