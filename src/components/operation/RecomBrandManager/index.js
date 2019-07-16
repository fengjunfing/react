import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/operation/RecomBrandManager/searchForm';
import ThisTable from '@/containers/operation/RecomBrandManager/table';
import ThisForm from '@/containers/operation/RecomBrandManager/form';
import ThisBtns from '@/containers/operation/RecomBrandManager/btns';

class RecomBrandManager extends Component {
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

export default RecomBrandManager;
