import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisSearchForm from '@/components/operation/ICBCEExclusiveSer/searchForm';

class ContainersICBCEExclusiveSerSearch extends BaseComponent {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    table: ImmutablePropTypes.list.isRequired,
    searchData: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool.isRequired,
    tableGet: PropTypes.func.isRequired,
  }
  searchSubmitBefore = formData => {
    if (formData && formData.belongRegion && formData.belongRegion.length > 0) {
      formData.belongRegion = formData.belongRegion[formData.belongRegion.length - 1];
    } else {
      formData.belongRegion = '';
    }
  }
  render() {
    
    return <ThisSearchForm {...this.props} searchSubmitBefore={this.searchSubmitBefore} />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['operation', 'icbcEExclusiveSer']);
  return {
    dictData: dict.get('data'),
    table: data.getIn(['table', 'data']),
    searchData: data.getIn(['table', 'searchData']),
    loading: data.getIn(['table', 'loading']),
  };
};

const methods = Actions.ICBC_E_EXCLUSIVE_SER;

const mapDispatchToProps = {
  tableGet: methods.tableGet,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersICBCEExclusiveSerSearch);
