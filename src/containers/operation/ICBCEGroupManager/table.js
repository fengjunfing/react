import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisTable from '@/components/operation/ICBCEGroupManager/table';

class ContainersICBCEGroupManagerTable extends BaseComponent {
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
    this.props.formGet({ id: record.id }, this.props.types).then(res => {
      const { refererType, refererNo, name } = res.get('result').toJS();
      if (refererType === 'CARMODEL') {
        this.props.hankCascaderCarBrandsList({
          name,
          id: refererNo,
        });
      }
    });
  }
  publish(record) {
    this.props.tablePublish({ id: record.id }).then(() => {
      this.props.tableGet({
        ...this.props.searchData.toJS(),
      });
    });
  }
  unpublish(record) {
    this.props.tableUnpublish({ id: record.id }).then(() => {
      this.props.tableGet({
        ...this.props.searchData.toJS(),
      });
    });
  }
  remove(record) {
    this.props.tableDelete({ id: record.id }).then(() => {
      this.props.tableGet({
        ...this.props.searchData.toJS(),
      });
    });
  }
  render() {
    return <ThisTable {...this.props}
      get={this.get}
      publish={this.publish}
      unpublish={this.unpublish}
      remove={this.remove}
    />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['operation', 'icbcEGroupManager']);
  return {
    dictData: dict.get('data'),
    table: data.getIn(['table', 'data']),
    count: data.getIn(['table', 'count']),
    searchData: data.getIn(['table', 'searchData']),
    loading: data.getIn(['table', 'loading']),
    types: data.getIn(['table', 'type']),
  };
};

const methods = Actions.ICBC_E_GROUP_MANAGER;

const mapDispatchToProps = {
  tableGet: methods.tableGet,
  tableDelete: methods.tableDelete,
  tablePublish: methods.tablePublish,
  tableUnpublish: methods.tableUnpublish,
  formReset: methods.formReset,
  formGet: methods.formGet,
  formShow: methods.formShow,
  hankCascaderCarBrandsList: methods.hankCascaderCarBrandsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersICBCEGroupManagerTable);
