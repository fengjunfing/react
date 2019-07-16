import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/operation/ICBCEExclusiveSer/searchForm';
import ThisTable from '@/containers/operation/ICBCEExclusiveSer/table';
import ThisForm from '@/containers/operation/ICBCEExclusiveSer/form';
import ThisBtns from '@/containers/operation/ICBCEExclusiveSer/btns';

class ICBCEExclusiveSer extends Component {
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

export default ICBCEExclusiveSer;
