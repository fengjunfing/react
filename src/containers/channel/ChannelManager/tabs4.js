import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisTab from '@/components/channel/ChannelManager/tabs4';

class ContainersTabs4 extends BaseComponent {
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
    formData: data.getIn(['config', 'merchant_service']),
    merchantServiceList: data.getIn(['config', 'merchantServiceList']),
  };
};

const methods = Actions.CHANNEL_MANAGER;

const mapDispatchToProps = {
  getChannelMerchantDefaultService: methods.getChannelMerchantDefaultService,
  getMerchantServiceList: methods.getMerchantServiceList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersTabs4);
