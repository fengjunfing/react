import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisForm from '@/components/operation/GroupManager/form';

class ContainersGroupManagerForm extends BaseComponent {
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
    submit: PropTypes.func.isRequired,
    tableGet: PropTypes.func.isRequired,
    openUploadLoading: PropTypes.func.isRequired,
    closeUploadLoading: PropTypes.func.isRequired,
  }
  get group () {
    return this.props.leftsTable.find(v => v.get('id') == this.props.searchData.get('groupId'));
  }
  get groupType () {
    if (this.group) {
      return this.group.get('refererType');
    }
    return '';
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
        if (!formData.groupId) {
          formData.groupId = this.props.searchData.get('groupId');
        }
        if (!formData.refererType) {
          formData.refererType = this.groupType;
        }
        const { refererNo, refererType } = formData;
        if (refererType === 'CARMODEL') {
          let name = this.props.carList.toJS();
          for (const i of refererNo) {
            name = name.find(v => v.value == i);
            if (name.children) {
              name = name.children;
            }
          }
          formData.name = name.label;
          formData.refererNo = refererNo[refererNo.length - 1];
        } else if (refererType === 'ACTIVITE') {
          formData.name = this.props.acList.find(v => v.get('id') == refererNo).get('name');
        } else if (refererType === 'WAP') {
          formData.refererNo = -1;
        }
        this.props.submit(formData).then(() => {
          const searchData = this.props.searchData.toJS();
          searchData.currentPage = formData.id ? searchData.currentPage : 1;
          this.props.tableGet(searchData, refererType);
          this.props.hide();
        });
      }
    });
  }
  render() {
    return <ThisForm ref={ c => { this.form = c; }} {...this.props} handleSubmit={this.handleSubmit.bind(this)} />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['operation', 'groupManager']);
  return {
    dictData: dict.get('data'),
    table: data.getIn(['table', 'data']),
    searchData: data.getIn(['table', 'searchData']),
    visible: data.getIn(['form', 'visible']),
    loading: data.getIn(['form', 'loading']),
    uploadLoading: data.getIn(['form', 'uploadLoading']),
    formData: data.getIn(['form', 'data']),
    title: data.getIn(['form', 'title']),
    leftsTable: data.getIn(['leftsTable', 'data']),
    carList: data.getIn(['form', 'carList']),
    acList: data.getIn(['form', 'activityList']),
  };
};

const methods = Actions.GROUP_MANAGER;

const mapDispatchToProps = {
  formSetData: methods.formSetData,
  hide: methods.formHide,
  submit: methods.formSubmit,
  tableGet: methods.tableGet,
  openUploadLoading: methods.formOpenUploadLoading,
  closeUploadLoading: methods.formCloseUploadLoading,
  carBrandsList: methods.carBrandsList,
  carSeriesList: methods.carSeriesList,
  carModelList: methods.carModelList,
  activityList: methods.activityList,
  nameFormShow: methods.nameFormShow,
  nameFormReset: methods.nameFormReset,
  nameFormSetType: methods.nameFormSetType,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersGroupManagerForm);
