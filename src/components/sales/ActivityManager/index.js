import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/sales/ActivityManager/searchForm';
import ThisTable from '@/containers/sales/ActivityManager/table';
import ThisForm from '@/containers/sales/ActivityManager/form';
import ThisBtns from '@/containers/sales/ActivityManager/btns';
import ThisCarModelForm from '@/containers/sales/ActivityManager/carModelForm';

class ActivityManager extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={{ display: this.props.visible ? 'none' : 'block' }}>
          <ThisSearchForm />
          <Divider style={{ margin: '0 0 -1px 0' }} />
          <ThisBtns />
          <Divider style={{ margin: 0 }} />
          <ThisTable />
        </div>
        {this.props.visible && <ThisForm />}
        <ThisCarModelForm />
      </React.Fragment>
    );
  }
}

export default ActivityManager;
