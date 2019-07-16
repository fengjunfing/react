import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisTab from '@/components/channel/ChannelManager/tabs5';

class ContainersTabs5 extends BaseComponent {
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
    formData: data.getIn(['config', 'channelMerchantInfoConfig']),
  };
};

const methods = Actions.CHANNEL_MANAGER;

const mapDispatchToProps = {
  getChannelMerchantInfoConfig: methods.getChannelMerchantInfoConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersTabs5);
