import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisBtns from '@/components/operation/ICBCEExclusiveSer/btns';

class ContainersICBCEExclusiveSerBtns extends BaseComponent {
  static propTypes = {
    table: ImmutablePropTypes.list.isRequired,
    loading: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
  }
  add() {
    this.props.reset();
    this.props.show('新增');
  }
  render() {
    return <ThisBtns {...this.props} add={this.add} />;
  }
}

const mapStateToProps = state => {
  const data = state.getIn(['operation', 'icbcEExclusiveSer']);
  return {
    table: data.getIn(['table', 'data']),
    loading: data.getIn(['table', 'loading']),
  };
};

const methods = Actions.ICBC_E_EXCLUSIVE_SER;

const mapDispatchToProps = {
  reset: methods.formReset,
  show: methods.formShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersICBCEExclusiveSerBtns);
