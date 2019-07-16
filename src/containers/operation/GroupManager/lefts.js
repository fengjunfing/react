import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import ThisBtns from '@/components/operation/GroupManager/lefts';

class ContainersGroupManagerLefts extends BaseComponent {
  static propTypes = {
    table: ImmutablePropTypes.list.isRequired,
    loading: PropTypes.bool.isRequired,
  }
  get groupName () {
    const group = this.props.table.find(v => v.get('id') == this.props.searchData.get('groupId'));
    if (group) {
      return group.get('name');
    }
    return '';
  }
  add = () => {
    this.props.reset();
    this.props.show('新增');
  }
  get = () => {
    this.props.formReset();
    this.props.formShow(`编辑 一 ${this.groupName}`);
    this.props.formGet({ id: this.props.searchData.get('groupId') });
  }
  render() {
    return <ThisBtns {...this.props} get={this.get} add={this.add} />;
  }
}

const mapStateToProps = state => {
  const data = state.getIn(['operation', 'groupManager']);
  return {
    table: data.getIn(['leftsTable', 'data']),
    loading: data.getIn(['leftsTable', 'loading']),
    searchData: data.getIn(['table', 'searchData']),
  };
};

const methods = Actions.GROUP_MANAGER;

const mapDispatchToProps = {
  leftsTableGet: methods.leftsTableGet,
  tableGet: methods.tableGet,
  leftsTableDelete: methods.leftsTableDelete,
  formReset: methods.leftsFormReset,
  formGet: methods.leftsFormGet,
  formShow: methods.leftsFormShow,
  reset: methods.leftsFormReset,
  show: methods.leftsFormShow,
  mainFormHide: methods.formHide,
  setType: methods.setType,
  setSearchData: methods.setSearchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersGroupManagerLefts);
