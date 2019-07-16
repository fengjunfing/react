import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisSearchForm from '@/components/channel/ChannelManager/tab3-searchForm';

class ContainersTab3Search extends BaseComponent {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    table: ImmutablePropTypes.list.isRequired,
    searchData: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool.isRequired,
    tableGet: PropTypes.func.isRequired,
  }

  render() {
    return <ThisSearchForm {...this.props} />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['channel', 'channelManager']);
  return {
    dictData: dict.get('data'),
    table: data.getIn(['config', 'contactsData']),
    searchData: data.getIn(['config', 'contactsSearchData']),
    loading: data.getIn(['config', 'contactsLoading']),
  };
};

const methods = Actions.CHANNEL_MANAGER;

const mapDispatchToProps = {
  tableGet: methods.channelContactsQueryDataListPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersTab3Search);
