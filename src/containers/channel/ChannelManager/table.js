import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisTable from '@/components/channel/ChannelManager/table';

class ContainersChannelManagerTable extends BaseComponent {
  static propTypes = {
    table: ImmutablePropTypes.list.isRequired,
    searchData: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool.isRequired,
    tableGet: PropTypes.func.isRequired,
    tablePublish: PropTypes.func.isRequired,
    tableUnpublish: PropTypes.func.isRequired,
    formReset: PropTypes.func.isRequired,
    formGet: PropTypes.func.isRequired,
    formShow: PropTypes.func.isRequired,
  }
  get(record) {
    this.props.formReset();
    this.props.formShow(`编辑 一 ${record.name}`);
    this.props.formGet({ id: record.id });
  }
  look(record) {
    this.props.formReset();
    this.props.formShow(`详情 一 ${record.name}`);
    this.props.formGet({ id: record.id });
  }
  config(record) {
    this.props.configShow();
    this.props.configBaseSave(record);
  }
  publish(record) {
    this.props.tablePublish({ id: record.id }).then(() => {
      this.props.tableGet(this.props.searchData.toJS());
    });
  }
  unpublish(record) {
    this.props.tableUnpublish({ id: record.id }).then(() => {
      this.props.tableGet(this.props.searchData.toJS());
    });
  }
  render() {
    return <ThisTable {...this.props}
      get={this.get}
      look={this.look}
      config={this.config}
      publish={this.publish}
      unpublish={this.unpublish}
    />;
  }
}

const mapStateToProps = state => {
  const data = state.getIn(['channel', 'channelManager']);
  return {
    table: data.getIn(['table', 'data']),
    count: data.getIn(['table', 'count']),
    searchData: data.getIn(['table', 'searchData']),
    loading: data.getIn(['table', 'loading']),
    title: data.getIn(['table', 'title']),
  };
};

const methods = Actions.CHANNEL_MANAGER;

const mapDispatchToProps = {
  tableGet: methods.tableGet,
  tableDelete: methods.tableDelete,
  tablePublish: methods.tablePublish,
  tableUnpublish: methods.tableUnpublish,
  formReset: methods.formReset,
  formGet: methods.formGet,
  formShow: methods.formShow,
  configShow: methods.configShow,
  configBaseSave: methods.configBaseSave,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersChannelManagerTable);
