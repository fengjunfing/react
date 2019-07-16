import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/basis/MerchantConfManager/searchForm';
import ThisTable from '@/containers/basis/MerchantConfManager/table';
import ThisForm from '@/containers/basis/MerchantConfManager/form';
import ThisBtns from '@/containers/basis/MerchantConfManager/btns';

class MerchantConfManager extends Component {
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

export default MerchantConfManager;
