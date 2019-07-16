import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Modal } from 'antd';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisTable from '@/components/sales/ActivityManager/table';

class ContainersActivityManagerTable extends BaseComponent {
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
    this.props.formShow(`查看 一 ${record.name}`);
    this.props.formGet({ id: record.id }, true);
  }
  edit(record) {
    this.props.formReset();
    this.props.formShow(`编辑 一 ${record.name}`);
    this.props.formGet({ id: record.id });
  }
  copy(record) {
    this.props.formGet({ id: record.id }).then(res => {
      const result = res.get('result').toJS();
      delete result.alias;
      delete result.auditStatus;
      delete result.channelId;
      delete result.createTime;
      delete result.createUser;
      delete result.id;
      delete result.isCancel;
      delete result.isDelete;
      delete result.status;
      this.props.formReset();
      this.props.formSetData(result);
      this.props.formShow(`新增 一 ${record.name}`);
    });
  }
  show(record) {
    this.props.showActivity({ id: record.id }).then(res => {
      window.open(res.get('result'));
    });
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
  remove(record) {
    this.props.tableDelete({ id: record.id }).then(() => {
      this.props.tableGet(this.props.searchData.toJS());
    });
  }
  submitAudit(record) {
    this.props.tableSubmitAudit({ id: record.id }).then(() => {
      this.props.tableGet(this.props.searchData.toJS());
    });
  }
  getReject(record) {
    this.props.tableReject({ id: record.id }).then(res => {
      Modal.error({
        title: '驳回原因',
        content: res.get('result').get('refuseReason'),
      });
    });
  }
  render() {
    return <ThisTable {...this.props}
      get={this.get}
      edit={this.edit}
      copy={this.copy}
      show={this.show}
      publish={this.publish}
      unpublish={this.unpublish}
      remove={this.remove}
      submitAudit={this.submitAudit}
      getReject={this.getReject}
    />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['sales', 'activityManager']);
  return {
    dictData: dict.get('data'),
    table: data.getIn(['table', 'data']),
    count: data.getIn(['table', 'count']),
    searchData: data.getIn(['table', 'searchData']),
    loading: data.getIn(['table', 'loading']),
  };
};

const methods = Actions.ACTIVITY_MANAGER;

const mapDispatchToProps = {
  tableGet: methods.tableGet,
  tableDelete: methods.tableDelete,
  tablePublish: methods.tablePublish,
  tableUnpublish: methods.tableUnpublish,
  formReset: methods.formReset,
  formGet: methods.formGet,
  formShow: methods.formShow,
  queryRoleList: methods.queryRoleList,
  showActivity: methods.showActivity,
  formSetData: methods.formSetData,
  tableSubmitAudit: methods.tableSubmitAudit,
  tableReject: methods.tableReject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersActivityManagerTable);
