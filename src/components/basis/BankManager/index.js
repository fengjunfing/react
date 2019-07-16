import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/basis/BankManager/searchForm';
import ThisTable from '@/containers/basis/BankManager/table';
import ThisForm from '@/containers/basis/BankManager/form';
import ThisBtns from '@/containers/basis/BankManager/btns';

class BankManager extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <div style={{ display: this.props.visible ? 'none' : 'block' }}>
          <ThisSearchForm />
          <Divider style={{ margin: '0 0 -1px 0' }} />
          <ThisBtns />
          <Divider style={{ margin: 0 }} />
          <ThisTable />
        </div>
        {this.props.visible && <ThisForm />} */}
        <ThisSearchForm />
        <Divider style={{ margin: '0 0 -1px 0' }} />
        <ThisBtns />
        <Divider style={{ margin: 0 }} />
        <ThisTable />
        <ThisForm />
      </React.Fragment>
    );
  }
}

export default BankManager;
