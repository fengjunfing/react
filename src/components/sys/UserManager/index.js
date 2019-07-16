import React from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/sys/UserManager/searchForm';
import ThisBtns from '@/containers/sys/UserManager/btns';
import ThisTable from '@/containers/sys/UserManager/table';
import ThisForm from '@/containers/sys/UserManager/form';
import ThisPasswordForm from '@/containers/sys/UserManager/passwordForm';
import ThisConfigForm from '@/containers/sys/UserManager/configForm';

const ComponentsUserManager = () => (
  <React.Fragment>
    <ThisSearchForm />
    <Divider style={{ margin: '0 0 -1px 0' }} />
    <ThisBtns />
    <Divider style={{ margin: 0 }} />
    <ThisTable />
    <ThisForm />
    <ThisPasswordForm />
    <ThisConfigForm />
  </React.Fragment>
);

export default ComponentsUserManager;