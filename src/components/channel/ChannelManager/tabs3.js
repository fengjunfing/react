import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/channel/ChannelManager/tab3-searchForm';
import ThisTable from '@/containers/channel/ChannelManager/tab3-table';
import ThisForm from '@/containers/channel/ChannelManager/tab3-form';

class Tabs3 extends Component {
  render() {
    return (
      <React.Fragment>
        <ThisSearchForm />
        <Divider style={{ margin: '0 0 -1px 0' }} />
        <Divider style={{ margin: 0 }} />
        <ThisTable />
        <ThisForm />
      </React.Fragment>
    );
  }
}

export default Tabs3;
