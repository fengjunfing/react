import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisBtns from '@/components/sys/DictManager/child/btns';

class ContainersDictManagerChildBtns extends BaseComponent {
  static propTypes = {
    table: ImmutablePropTypes.list.isRequired,
    loading: PropTypes.bool.isRequired,
    searchData: ImmutablePropTypes.map.isRequired,
    formSetData: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
  }
  add() {
    this.props.reset();
    this.props.formSetData({ typeCode: this.props.searchData.get('typeCode') });
    this.props.show('新增字典');
  }
  render() {
    return <ThisBtns {...this.props} add={this.add} />;
  }
}

const mapStateToProps = state => {
  const data = state.getIn(['sys', 'dictManager']);
  return {
    table: data.getIn(['childTable', 'data']),
    loading: data.getIn(['childTable', 'loading']),
    searchData: data.getIn(['childTable', 'searchData']),
  };
};

const methods = Actions.DICT_MANAGER;

const mapDispatchToProps = {
  formSetData: methods.childFormSetData,
  hide: methods.childTableHide,
  reset: methods.childFormReset,
  show: methods.childFormShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersDictManagerChildBtns);