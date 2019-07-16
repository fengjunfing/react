import React from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/sys/MenuManager/searchForm';
import ThisBtns from '@/containers/sys/MenuManager/btns';
import ThisTable from '@/containers/sys/MenuManager/table';
import ThisForm from '@/containers/sys/MenuManager/form';

const ComponentsMenuManager = () => (
  <React.Fragment>
    <ThisSearchForm />
    <Divider style={{ margin: '0 0 -1px 0' }} />
    <ThisBtns />
    <Divider style={{ margin: 0 }} />
    <ThisTable />
    <ThisForm />
  </React.Fragment>
);

export default ComponentsMenuManager;