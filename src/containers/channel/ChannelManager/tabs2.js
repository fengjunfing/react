import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisTab from '@/components/channel/ChannelManager/tabs2';

class ContainersTabs2 extends BaseComponent {
  render() {
    return <ThisTab {...this.props} ref={this.props.getRef} />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['channel', 'channelManager']);
  return {
    dictData: dict.get('data'),
    base: data.getIn(['config', 'base']),
    formData: data.getIn(['config', 'icbc_e']),
  };
};

const methods = Actions.CHANNEL_MANAGER;

const mapDispatchToProps = {
  meltingEBoughtConfigSelectByChannelId: methods.meltingEBoughtConfigSelectByChannelId,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersTabs2);
