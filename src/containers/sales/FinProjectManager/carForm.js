import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { notification } from 'antd';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisForm from '@/components/sales/FinProjectManager/carForm';

class ContainersFinProjectManagerCarForm extends BaseComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
    title: PropTypes.string.isRequired,
    formSetData: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,
  }
  handleSubmit() {
    const carModelList = this.props.formData.get('list').toJS();
    if (carModelList.length <= 0) {
      return notification.error({
        message: '错误',
        description: '请添加车型！',
      });
    }
    this.props.addSchemeCarModelList({
      carModelList,
      schemeId: this.props.formData.get('schemeId'),
    }).then(() => {
      this.props.hide();
    });
  }
  render() {
    return <ThisForm ref={ c => { this.form = c; }} {...this.props} handleSubmit={this.handleSubmit.bind(this)} />;
  }
}

const mapStateToProps = state => {
  const data = state.getIn(['sales', 'finProjectManager']);
  return {
    formData: data.getIn(['configCarForm', 'data']),
    visible: data.getIn(['configCarForm', 'visible']),
    title: data.getIn(['configCarForm', 'title']),
    loading: data.getIn(['configCarForm', 'loading']),
    carList: data.getIn(['configCarForm', 'carList']),
  };
};

const methods = Actions.FIN_PROJECT_MANAGER;

const mapDispatchToProps = {
  formSetData: methods.configCarFormSetData,
  hide: methods.configCarFormHide,
  carBrandsList: methods.carBrandsList,
  carSeriesList: methods.carSeriesList,
  carModelList: methods.carModelList,
  addSchemeCarModelList: methods.addSchemeCarModelList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersFinProjectManagerCarForm);
