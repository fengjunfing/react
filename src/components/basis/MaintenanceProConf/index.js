import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/basis/MaintenanceProConf/searchForm';
import ThisTable from '@/containers/basis/MaintenanceProConf/table';
import ThisForm from '@/containers/basis/MaintenanceProConf/form';
import ThisBtns from '@/containers/basis/MaintenanceProConf/btns';

class MaintenanceProConf extends Component {
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

export default MaintenanceProConf;
