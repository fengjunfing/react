import React from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/sys/FunctionManager/searchForm';
import ThisBtns from '@/containers/sys/FunctionManager/btns';
import ThisTable from '@/containers/sys/FunctionManager/table';
import ThisForm from '@/containers/sys/FunctionManager/form';

const ComponentsFunctionManager = () => (
  <React.Fragment>
    <ThisSearchForm />
    <Divider style={{ margin: '0 0 -1px 0' }} />
    <ThisBtns />
    <Divider style={{ margin: 0 }} />
    <ThisTable />
    <ThisForm />
  </React.Fragment>
);

export default ComponentsFunctionManager;