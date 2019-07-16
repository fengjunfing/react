import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisTab from '@/components/channel/ChannelManager/tabs3';

class ContainersTabs3 extends BaseComponent {
  render() {
    return <ThisTab {...this.props} />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['channel', 'channelManager']);
  return {
    dictData: dict.get('data'),
    base: data.getIn(['config', 'base']),
    formData: data.getIn(['config', 'data']),
  };
};

const methods = Actions.CHANNEL_MANAGER;

const mapDispatchToProps = {
  appConfigSelectByChannelId: methods.appConfigSelectByChannelId,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersTabs3);
