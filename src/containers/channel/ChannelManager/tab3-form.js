import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisForm from '@/components/channel/ChannelManager/tab3-form';

class ContainersTab3Form extends BaseComponent {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    visible: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    uploadLoading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
    title: PropTypes.string.isRequired,
    formSetData: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    tableGet: PropTypes.func.isRequired,
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
    return <ThisForm ref={c => { this.form = c; }} {...this.props} handleSubmit={this.handleSubmit.bind(this)} />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['channel', 'channelManager']);
  return {
    dictData: dict.get('data'),
    searchData: data.getIn(['config', 'contactsSearchData']),
    visible: data.getIn(['contactsForm', 'visible']),
    loading: data.getIn(['contactsForm', 'loading']),
    uploadLoading: data.getIn(['contactsForm', 'uploadLoading']),
    formData: data.getIn(['contactsForm', 'data']),
    title: data.getIn(['contactsForm', 'title']),
  };
};

const methods = Actions.CHANNEL_MANAGER;

const mapDispatchToProps = {
  formSetData: methods.formSetData,
  hide: methods.contactsFormHide,
  submit: methods.contactsFormSubmit,
  tableGet: methods.channelContactsQueryDataListPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersTab3Form);
