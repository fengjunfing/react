import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/operation/CarouselManager/searchForm';
import ThisTable from '@/containers/operation/CarouselManager/table';
import ThisForm from '@/containers/operation/CarouselManager/form';
import ThisBtns from '@/containers/operation/CarouselManager/btns';

class CarouselManager extends Component {
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

export default CarouselManager;
