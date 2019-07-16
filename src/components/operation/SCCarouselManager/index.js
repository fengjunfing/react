import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/operation/SCCarouselManager/searchForm';
import ThisTable from '@/containers/operation/SCCarouselManager/table';
import ThisForm from '@/containers/operation/SCCarouselManager/form';
import ThisBtns from '@/containers/operation/SCCarouselManager/btns';

class SCCarouselManager extends Component {
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

export default SCCarouselManager;
