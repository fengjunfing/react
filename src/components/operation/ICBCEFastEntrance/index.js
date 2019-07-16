import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/operation/ICBCEFastEntrance/searchForm';
import ThisTable from '@/containers/operation/ICBCEFastEntrance/table';
import ThisForm from '@/containers/operation/ICBCEFastEntrance/form';
import ThisBtns from '@/containers/operation/ICBCEFastEntrance/btns';

class ICBCEFastEntrance extends Component {
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

export default ICBCEFastEntrance;
