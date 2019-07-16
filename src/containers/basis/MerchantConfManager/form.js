import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisForm from '@/components/basis/MerchantConfManager/form';

class ContainersMerchantConfManagerForm extends BaseComponent {
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
        this.props.submit(formData).then(() => {
          const searchData = this.props.searchData.toJS();
          searchData.currentPage = formData.id ? searchData.currentPage : 1;
          this.props.tableGet(searchData);
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
  const data = state.getIn(['basis', 'merchantConfManager']);
  return {
    dictData: dict.get('data'),
    table: data.getIn(['table', 'data']),
    searchData: data.getIn(['table', 'searchData']),
    visible: data.getIn(['form', 'visible']),
    loading: data.getIn(['form', 'loading']),
    uploadLoading: data.getIn(['form', 'uploadLoading']),
    formData: data.getIn(['form', 'data']),
    title: data.getIn(['form', 'title']),
    roleList: data.getIn(['form', 'roleList']),
  };
};

const methods = Actions.MERCHANT_CONF_MANAGER;

const mapDispatchToProps = {
  formSetData: methods.formSetData,
  hide: methods.formHide,
  submit: methods.formSubmit,
  tableGet: methods.tableGet,
  openUploadLoading: methods.formOpenUploadLoading,
  closeUploadLoading: methods.formCloseUploadLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersMerchantConfManagerForm);
