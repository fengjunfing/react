import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import Login from '@/components/basic/Login';

class ContainersLogin extends BaseComponent {
  static propTypes ={
    login: PropTypes.func.isRequired,
  }
  render() {
    return <Login {...this.props} />;
  }
}

const { LOGIN } = Actions;

const mapDispatchToProps = {
  login: LOGIN.login,
};

export default connect(null, mapDispatchToProps)(ContainersLogin);