import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisForm from '@/components/sales/ActivityManager/carModelForm';

class ContainersActivityManagerForm extends BaseComponent {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    table: ImmutablePropTypes.list.isRequired,
    searchData: ImmutablePropTypes.map.isRequired,
    visible: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    uploadLoading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
    title: PropTypes.string.isRequired,
    formSetData: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,
    openUploadLoading: PropTypes.func.isRequired,
    closeUploadLoading: PropTypes.func.isRequired,
  }
  handleSubmit() {
    this.form.validateFields((err, values) => {
      if (!err) {
        const formData = {
          ...this.props.formData.toJS(),
          ...values,
        };
        for (var v in formData) {
          formData[v] = formData[v] === undefined ? '' : formData[v];
        }
        const { carModelId } = formData;
        let name = this.props.carList.toJS();
        for (const i of carModelId) {
          name = name.find(v => v.value == i);
          if (name.children) {
            name = name.children;
          }
        }
        formData.name = name.label;
        formData.firstPayment = name.firstPayment;
        formData.monthlyPayment = name.monthlyPayment;
        formData.carModelId = carModelId[carModelId.length - 1];
        const originFormData = this.props.originFormData.toJS();
        originFormData.activityCarModelList = originFormData.activityCarModelList || [];
        if (formData.__editIndex >= 0) {
          const index = formData.__editIndex;
          delete formData.__editIndex;
          originFormData.activityCarModelList.splice(index, 1, formData);
        } else {
          originFormData.activityCarModelList.push(formData);
        }
        this.props.originFormSetData(originFormData);
        this.props.hide();
      }
    });
  }
  render() {
    return <ThisForm ref={c => { this.form = c; }} {...this.props} handleSubmit={this.handleSubmit.bind(this)} />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['sales', 'activityManager']);
  const groupManager = state.getIn(['operation', 'groupManager']);
  return {
    dictData: dict.get('data'),
    table: data.getIn(['table', 'data']),
    searchData: data.getIn(['table', 'searchData']),
    visible: data.getIn(['carModelForm', 'visible']),
    loading: data.getIn(['carModelForm', 'loading']),
    uploadLoading: data.getIn(['carModelForm', 'uploadLoading']),
    formData: data.getIn(['carModelForm', 'data']),
    originFormData: data.getIn(['form', 'data']),
    title: data.getIn(['carModelForm', 'title']),
    carList: groupManager.getIn(['form', 'carList']),
  };
};

const methods = Actions.ACTIVITY_MANAGER;
const GROUP_MANAGER = Actions.GROUP_MANAGER;

const mapDispatchToProps = {
  formSetData: methods.carModelFormSetData,
  originFormSetData: methods.formSetData,
  hide: methods.carModelFormHide,
  openUploadLoading: methods.carModelFormOpenUploadLoading,
  closeUploadLoading: methods.carModelFormCloseUploadLoading,
  carBrandsList: GROUP_MANAGER.carBrandsList,
  carSeriesList: GROUP_MANAGER.carSeriesList,
  carModelList: GROUP_MANAGER.carModelList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersActivityManagerForm);
