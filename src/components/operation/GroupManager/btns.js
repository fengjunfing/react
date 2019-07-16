import React, { Component } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import LayoutBtns from '@/components/common/layout/Btns';

export default class ComponentsGroupManagerBtns extends Component {
  static propTypes = {
    table: ImmutablePropTypes.list.isRequired,
    loading: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
  }
  render() {
    return (
      <LayoutBtns>
        <Button onClick={this.props.add.bind(this)} loading={this.props.loading || this.props.table.some(t => t.get('loading'))} type="primary">新增</Button>
      </LayoutBtns>
    );
  }
}
