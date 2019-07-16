import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/operation/BulletinManager/searchForm';
import ThisTable from '@/containers/operation/BulletinManager/table';
import ThisForm from '@/containers/operation/BulletinManager/form';
import ThisBtns from '@/containers/operation/BulletinManager/btns';

class BulletinManager extends Component {
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

export default BulletinManager;
