import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisTable from '@/components/channel/ChannelAdminManager/table';

class ContainersChannelAdminManagerTable extends BaseComponent {
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
  getPassword(record) {
    this.props.passwordFormReset();
    this.props.passwordFormSetData({ id: record.id });
    this.props.passwordFormShow(`修改密码 一 ${record.loginName}`);
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
  getConfig(record) {
    this.props.configFormReset();
    this.props.configFormShow(`配置角色 一 ${record.name}`);
    this.props.configFormOpenLoading();
    this.props.configFormSetData({ id: record.id });
    Promise.all([
      this.props.configFormGetAllMenu(),
      this.props.configFormGetMenuByRole({ id: record.id }),
    ])
      .then(() => {
        this.props.configFormCloseLoading();
      }, () => {
        this.props.configFormHide();
      });
  }
  render() {
    return <ThisTable {...this.props}
      get={this.get}
      getPassword={this.getPassword}
      publish={this.publish}
      unpublish={this.unpublish}
      remove={this.remove}
      getConfig={this.getConfig}
    />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['channel', 'channelAdminManager']);
  return {
    dictData: dict.get('data'),
    table: data.getIn(['table', 'data']),
    count: data.getIn(['table', 'count']),
    searchData: data.getIn(['table', 'searchData']),
    loading: data.getIn(['table', 'loading']),
  };
};

const methods = Actions.CHANNEL_ADMIN_MANAGER;

const mapDispatchToProps = {
  tableGet: methods.tableGet,
  tableDelete: methods.tableDelete,
  tablePublish: methods.tablePublish,
  tableUnpublish: methods.tableUnpublish,
  formReset: methods.formReset,
  formGet: methods.formGet,
  formShow: methods.formShow,
  passwordFormSetData: methods.passwordFormSetData,
  passwordFormReset: methods.passwordFormReset,
  passwordFormShow: methods.passwordFormShow,
  configFormReset: methods.configFormReset,
  configFormShow: methods.configFormShow,
  configFormHide: methods.configFormHide,
  configFormSetData: methods.configFormSetData,
  configFormGetAllMenu: methods.configFormGetAllMenu,
  configFormGetMenuByRole: methods.configFormGetMenuByRole,
  configFormOpenLoading: methods.configFormOpenLoading,
  configFormCloseLoading: methods.configFormCloseLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersChannelAdminManagerTable);
