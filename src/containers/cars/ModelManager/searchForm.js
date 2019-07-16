import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisSearchForm from '@/components/cars/ModelManager/searchForm';

class ContainersModelManagerSearch extends BaseComponent {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    table: ImmutablePropTypes.list.isRequired,
    searchData: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool.isRequired,
    tableGet: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getCarBrandsList();
    this.props.getCarSeriesList();
  }
  
  render() {
    return <ThisSearchForm {...this.props} />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['cars', 'modelManager']);
  return {
    dictData: dict.get('data'),
    table: data.getIn(['table', 'data']),
    searchData: data.getIn(['table', 'searchData']),
    loading: data.getIn(['table', 'loading']),
    brandsList: data.getIn(['searchForm', 'brandsList']).toJS(),
    seriesList: data.getIn(['searchForm', 'seriesList']).toJS(),
  };
};

const methods = Actions.MODEL_MANAGER;

const mapDispatchToProps = {
  tableGet: methods.tableGet,
  getCarBrandsList: methods.getCarBrandsList,
  getCarSeriesList: methods.getCarSeriesList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersModelManagerSearch);
