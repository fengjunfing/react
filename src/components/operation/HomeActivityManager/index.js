import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/operation/HomeActivityManager/searchForm';
import ThisTable from '@/containers/operation/HomeActivityManager/table';
import ThisForm from '@/containers/operation/HomeActivityManager/form';
import ThisBtns from '@/containers/operation/HomeActivityManager/btns';

class HomeActivityManager extends Component {
  render() {
    return (
      <React.Fragment>
        <ThisSearchForm />
        <Divider style={{ margin: '0 0 -1px 0' }} />
        <ThisBtns />
        <Divider style={{ margin: 0 }} />
        <ThisTable />
        <ThisForm />
      </React.Fragment>
    );
  }
}

export default HomeActivityManager;
