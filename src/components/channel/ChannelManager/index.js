import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/channel/ChannelManager/searchForm';
import ThisTable from '@/containers/channel/ChannelManager/table';
import ThisForm from '@/containers/channel/ChannelManager/form';
import ThisConfig from '@/containers/channel/ChannelManager/config';

class ChannelManager extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={{ display: this.props.configVisible ? 'none' : 'block' }}>
          <ThisSearchForm />
          <Divider style={{ margin: '0 0 -1px 0' }} />
          <Divider style={{ margin: 0 }} />
          <ThisTable />
          <ThisForm />
        </div>
        {this.props.configVisible && <ThisConfig />}
      </React.Fragment>
    );
  }
}

export default ChannelManager;
