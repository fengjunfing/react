import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/operation/SCRecomBrandManager/searchForm';
import ThisTable from '@/containers/operation/SCRecomBrandManager/table';
import ThisForm from '@/containers/operation/SCRecomBrandManager/form';
import ThisBtns from '@/containers/operation/SCRecomBrandManager/btns';

class SCRecomBrandManager extends Component {
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

export default SCRecomBrandManager;
