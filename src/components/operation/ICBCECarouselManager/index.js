import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/operation/ICBCECarouselManager/searchForm';
import ThisTable from '@/containers/operation/ICBCECarouselManager/table';
import ThisForm from '@/containers/operation/ICBCECarouselManager/form';
import ThisBtns from '@/containers/operation/ICBCECarouselManager/btns';

class ICBCECarouselManager extends Component {
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

export default ICBCECarouselManager;
