import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/sales/ICBCEOrderQuery/searchForm';
import ThisTable from '@/containers/sales/ICBCEOrderQuery/table';

class ICBCEOrderQuery extends Component {
  render() {
    return (
      <React.Fragment>
        <ThisSearchForm />
        <Divider style={{ margin: '0 0 -1px 0' }} />
        <Divider style={{ margin: 0 }} />
        <ThisTable />
      </React.Fragment>
    );
  }
}

export default ICBCEOrderQuery;
