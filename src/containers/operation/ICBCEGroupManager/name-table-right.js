import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisTable from '@/components/operation/ICBCEGroupManager/name-table-right';

class ContainersICBCEGroupManagerNameTableRight extends BaseComponent {
  static propTypes = {
    table: ImmutablePropTypes.list.isRequired,
    searchData: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool.isRequired,
  }
  render() {
    return <ThisTable {...this.props} appendParams={[this.props.types]} />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['operation', 'icbcEGroupManager']);
  return {
    dictData: dict.get('data'),
    table: data.getIn(['nameTableRight', 'data']),
    count: data.getIn(['nameTableRight', 'count']),
    searchData: data.getIn(['nameTableRight', 'searchData']),
    loading: data.getIn(['nameTableRight', 'loading']),
    types: data.getIn(['nameForm', 'type']),
    formData: data.getIn(['form', 'data']),
  };
};

const methods = Actions.ICBC_E_GROUP_MANAGER;

const mapDispatchToProps = {
  tableGet: methods.nameTableRightGet,
  formSetData: methods.formSetData,
  nameFormHide: methods.nameFormHide,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersICBCEGroupManagerNameTableRight);
