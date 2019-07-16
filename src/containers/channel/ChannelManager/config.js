import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisConfig from '@/components/channel/ChannelManager/config';

class ContainersChannelManagerConfig extends BaseComponent {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    visible: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
  }
  render() {
    return <ThisConfig {...this.props} />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['channel', 'channelManager']);
  return {
    dictData: dict.get('data'),
    visible: data.getIn(['config', 'visible']),
    loading: data.getIn(['config', 'loading']),
    tabs: data.getIn(['config', 'tabs']),
    base: data.getIn(['config', 'base']),
  };
};

const methods = Actions.CHANNEL_MANAGER;

const mapDispatchToProps = {
  hide: methods.configHide,
  appConfigUpdateAppConfig: methods.appConfigUpdateAppConfig,
  meltingEBoughtConfigUpdateConfig: methods.meltingEBoughtConfigUpdateConfig,
  contactsFormReset: methods.contactsFormReset,
  contactsFormShow: methods.contactsFormShow,
  contactsFormSetData: methods.contactsFormSetData,
  addOrUpdateDefaultConfig: methods.addOrUpdateDefaultConfig,
  insertOrUpdateInitConfig: methods.insertOrUpdateInitConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersChannelManagerConfig);
