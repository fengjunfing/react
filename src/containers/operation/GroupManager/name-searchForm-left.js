import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisSearchForm from '@/components/operation/GroupManager/name-searchForm-left';

class ContainersGroupManagerNameSearchLeft extends BaseComponent {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    table: ImmutablePropTypes.list.isRequired,
    searchData: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool.isRequired,
    tableGet: PropTypes.func.isRequired,
  }
  render() {
    return <ThisSearchForm {...this.props} appendParams={[this.props.types]} />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['operation', 'groupManager']);
  return {
    dictData: dict.get('data'),
    table: data.getIn(['nameTableLeft', 'data']),
    searchData: data.getIn(['nameTableLeft', 'searchData']),
    loading: data.getIn(['nameTableLeft', 'loading']),
    types: data.getIn(['nameForm', 'type']),
  };
};

const methods = Actions.GROUP_MANAGER;

const mapDispatchToProps = {
  tableGet: methods.nameTableLeftGet,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersGroupManagerNameSearchLeft);
