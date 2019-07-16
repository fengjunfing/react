import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisSearchForm from '@/components/operation/TicketManager/searchForm';

class ContainersTicketManagerSearch extends BaseComponent {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    table: ImmutablePropTypes.list.isRequired,
    searchData: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool.isRequired,
    tableGet: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.props.getChannelNameList();
  }
  render() {
    return <ThisSearchForm {...this.props} />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['operation', 'ticketManager']);
  return {
    dictData: dict.get('data'),
    table: data.getIn(['table', 'data']),
    searchData: data.getIn(['table', 'searchData']),
    loading: data.getIn(['table', 'loading']),
    channelNameList: data.getIn(['table', 'channelNameList']),
  };
};

const methods = Actions.TICKET_MANAGER;

const mapDispatchToProps = {
  tableGet: methods.tableGet,
  getChannelNameList: methods.getChannelNameList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersTicketManagerSearch);
