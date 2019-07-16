import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisTable from '@/components/operation/GroupManager/name-table-left';

class ContainersGroupManagerNameTableLeft extends BaseComponent {
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
  const data = state.getIn(['operation', 'groupManager']);
  return {
    dictData: dict.get('data'),
    table: data.getIn(['nameTableLeft', 'data']),
    count: data.getIn(['nameTableLeft', 'count']),
    searchData: data.getIn(['nameTableLeft', 'searchData']),
    loading: data.getIn(['nameTableLeft', 'loading']),
    types: data.getIn(['nameForm', 'type']),
  };
};

const methods = Actions.GROUP_MANAGER;

const mapDispatchToProps = {
  tableGet: methods.nameTableLeftGet,
  nameFormSetLeftData: methods.nameFormSetLeftData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersGroupManagerNameTableLeft);
