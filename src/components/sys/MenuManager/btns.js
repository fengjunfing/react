import React, { Component } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import LayoutBtns from '@/components/common/layout/Btns';

export default class ComponentsMenuManagerBtns extends Component {
  static propTypes = {
    searchData: ImmutablePropTypes.map.isRequired,
    appName: PropTypes.string.isRequired,
    table: ImmutablePropTypes.list.isRequired,
    loading: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
    formGetMenuTree: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
  }
  render() {
    return (
      <LayoutBtns>
        {
          this.props.appName ? 
            <span style={{ marginRight: 6 }}>当前选中: <b>{this.props.appName}</b></span> : ''
        }
        <Button disabled={!this.props.searchData.get('appId')} onClick={this.props.add.bind(this)} loading={this.props.loading || this.props.table.some(t => t.get('loading'))} type="primary">新增</Button>
      </LayoutBtns>
    );
  }
}