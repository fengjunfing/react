import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisBtns from '@/components/operation/CarouselManager/btns';

class ContainersCarouselManagerBtns extends BaseComponent {
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
  const data = state.getIn(['operation', 'carouselManager']);
  return {
    table: data.getIn(['table', 'data']),
    loading: data.getIn(['table', 'loading']),
  };
};

const methods = Actions.CAROUSEL_MANAGER;

const mapDispatchToProps = {
  reset: methods.formReset,
  show: methods.formShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersCarouselManagerBtns);
