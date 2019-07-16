import React from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/sys/RoleManager/searchForm';
import ThisBtns from '@/containers/sys/RoleManager/btns';
import ThisTable from '@/containers/sys/RoleManager/table';
import ThisForm from '@/containers/sys/RoleManager/form';
import ThisConfigForm from '@/containers/sys/RoleManager/configForm';
import ThisFuncForm from '@/containers/sys/RoleManager/funcForm';

const ComponentsRoleManager = () => (
  <React.Fragment>
    <ThisSearchForm />
    <Divider style={{ margin: '0 0 -1px 0' }} />
    <ThisBtns />
    <Divider style={{ margin: 0 }} />
    <ThisTable />
    <ThisForm />
    <ThisConfigForm />
    <ThisFuncForm />
  </React.Fragment>
);

export default ComponentsRoleManager;