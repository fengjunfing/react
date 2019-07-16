import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import Logo from '@/components/basic/Logo';
import Menu from '@/containers/basic/Menu';
import Head from '@/containers/basic/Head';
import Tabs from '@/containers/basic/Tabs';

const { Header, Content, Sider } = Layout;

const ComponentsApp = ({ collapsed, menuType }) => (
  <Layout>
    <Layout style={{ display: menuType === 'top' ? 'flex' : 'none' }}>
      <Sider collapsed={collapsed} style={{ backgroundColor: 'white' }}>
        <Logo collapsed={collapsed} menuType={menuType} />
      </Sider>
      <Content>
        {
          menuType === 'left' ? '' : <Route component={Menu} />
        }
        <div style={{ height: 44, lineHeight: '20px', padding: 12, background: 'white', boxShadow: '0 1px 4px gray' }}>
          {
            menuType === 'left' ? '' : <Route component={Head} />
          }
        </div>
      </Content>
    </Layout>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ display: menuType === 'left' ? 'block' : 'none', width: 180, height: '100vh', overflow: 'auto' }}>
        <Logo collapsed={collapsed} menuType={menuType} />
        {
          menuType === 'top' ? '' : <Route component={Menu} />
        }
      </Sider>
      <Layout>
        <Header style={{ display: menuType === 'left' ? 'block' : 'none', height: 44, lineHeight: '20px', padding: 12, background: 'white', boxShadow: '0 1px 4px gray' }}>
          {
            menuType === 'top' ? '' : <Route component={Head} />
          }
        </Header>
        <Content style={{ margin: '11px 20px 0' }}>
          <Route component={Tabs} />
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

ComponentsApp.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  menuType: PropTypes.string.isRequired,
};

export default ComponentsApp;