import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisTable from '@/components/channel/ChannelManager/tab3-table';

class ContainersTab3Table extends BaseComponent {
  static propTypes = {
    table: ImmutablePropTypes.list.isRequired,
    searchData: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool.isRequired,
    tableGet: PropTypes.func.isRequired,
  }
  del({ id }) {
    this.props.delete({ id }).then(() => {
      this.props.tableGet();
    });
  }
  edit({ id, name }) {
    this.props.contactsFormReset();
    this.props.getEdit({ id }).then(() => {
      this.props.contactsFormShow(`编辑 一 ${name}`);
    });
  }
  render() {
    return <ThisTable {...this.props}
      del={this.del}
      edit={this.edit}
    />;
  }
}

const mapStateToProps = state => {
  const data = state.getIn(['channel', 'channelManager']);
  return {
    table: data.getIn(['config', 'contactsData']),
    searchData: data.getIn(['config', 'contactsSearchData']),
    loading: data.getIn(['config', 'contactsLoading']),
    count: data.getIn(['config', 'contactsCount']),
  };
};

const methods = Actions.CHANNEL_MANAGER;

const mapDispatchToProps = {
  formReset: methods.formReset,
  tableGet: methods.channelContactsQueryDataListPage,
  delete: methods.channelContactsDeleteCarBrandsByPrimaryKey,
  getEdit: methods.channelContactsSelectByPrimaryKey,
  contactsFormReset: methods.contactsFormReset,
  contactsFormShow: methods.contactsFormShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersTab3Table);
