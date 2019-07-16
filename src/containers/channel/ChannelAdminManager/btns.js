import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisBtns from '@/components/channel/ChannelAdminManager/btns';

class ContainersChannelAdminManagerBtns extends BaseComponent {
  static propTypes = {
    table: ImmutablePropTypes.list.isRequired,
    loading: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
  }
  add() {
    this.props.reset();
    this.props.show('新增用户');
  }
  render() {
    return <ThisBtns {...this.props} add={this.add} />;
  }
}

const mapStateToProps = state => {
  const data = state.getIn(['channel', 'channelAdminManager']);
  return {
    table: data.getIn(['table', 'data']),
    loading: data.getIn(['table', 'loading']),
  };
};

const methods = Actions.CHANNEL_ADMIN_MANAGER;

const mapDispatchToProps = {
  reset: methods.formReset,
  show: methods.formShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersChannelAdminManagerBtns);
