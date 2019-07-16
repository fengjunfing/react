import React, { Component } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import LayoutBtns from '@/components/common/layout/Btns';

export default class ComponentsRoleManagerBtns extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
  }
  render() {
    return (
      <LayoutBtns>
        <Button onClick={this.props.add.bind(this)} loading={this.props.loading} type="primary">新增</Button>
      </LayoutBtns>
    );
  }
}