import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisForm from '@/components/operation/GroupManager/leftsForm';

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
        this.props.submit(formData).then(res => {
          const groupId = res.get('result').get('id');
          if (this.props.leftsTable.size < 1) {
            this.props.setSearchData({ groupId });
          }
          this.props.tableGet();
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
    visible: data.getIn(['leftsForm', 'visible']),
    loading: data.getIn(['leftsForm', 'loading']),
    uploadLoading: data.getIn(['leftsForm', 'uploadLoading']),
    formData: data.getIn(['leftsForm', 'data']),
    title: data.getIn(['leftsForm', 'title']),
    leftsTable: data.getIn(['leftsTable', 'data']),
  };
};

const methods = Actions.GROUP_MANAGER;

const mapDispatchToProps = {
  formSetData: methods.leftsFormSetData,
  hide: methods.leftsFormHide,
  submit: methods.leftsFormSubmit,
  tableGet: methods.leftsTableGet,
  openUploadLoading: methods.leftsFormOpenUploadLoading,
  closeUploadLoading: methods.leftsFormCloseUploadLoading,
  setSearchData: methods.setSearchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersGroupManagerForm);
