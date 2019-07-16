import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/basis/ChannelSerTypeConf/searchForm';
import ThisTable from '@/containers/basis/ChannelSerTypeConf/table';
import ThisForm from '@/containers/basis/ChannelSerTypeConf/form';
import ThisBtns from '@/containers/basis/ChannelSerTypeConf/btns';

class ChannelSerTypeConf extends Component {
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

export default ChannelSerTypeConf;
