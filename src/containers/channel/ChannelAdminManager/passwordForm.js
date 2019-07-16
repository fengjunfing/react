import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisForm from '@/components/sys/UserManager/passwordForm';

class ContainersChannelAdminManagerPasswordForm extends BaseComponent {
  static propTypes = {
    table: ImmutablePropTypes.list.isRequired,
    visible: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
    title: PropTypes.string.isRequired,
    hide: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
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
  const data = state.getIn(['channel', 'channelAdminManager']);
  return {
    table: data.getIn(['table', 'data']),
    visible: data.getIn(['passwordForm', 'visible']),
    loading: data.getIn(['passwordForm', 'loading']),
    formData: data.getIn(['passwordForm', 'data']),
    title: data.getIn(['passwordForm', 'title']),
  };
};

const methods = Actions.CHANNEL_ADMIN_MANAGER;

const mapDispatchToProps = {
  hide: methods.passwordFormHide,
  submit: methods.passwordFormSubmit,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersChannelAdminManagerPasswordForm);
