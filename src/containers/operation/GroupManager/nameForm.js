import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisForm from '@/components/operation/GroupManager/nameForm';

class ContainersGroupManagerNameForm extends BaseComponent {
  render() {
    return <ThisForm {...this.props} />;
  }
}

const mapStateToProps = state => {
  const dict = state.getIn(['basic', 'dict']);
  const data = state.getIn(['operation', 'groupManager']);
  return {
    dictData: dict.get('data'),
    visible: data.getIn(['nameForm', 'visible']),
    loading: data.getIn(['nameForm', 'loading']),
    title: data.getIn(['nameForm', 'title']),
    leftData: data.getIn(['nameForm', 'leftData']),
  };
};

const methods = Actions.GROUP_MANAGER;

const mapDispatchToProps = {
  hide: methods.nameFormHide,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersGroupManagerNameForm);
