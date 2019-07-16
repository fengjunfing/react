import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/basis/MortgageFreeManager/searchForm';
import ThisTable from '@/containers/basis/MortgageFreeManager/table';
import ThisForm from '@/containers/basis/MortgageFreeManager/form';
import ThisBtns from '@/containers/basis/MortgageFreeManager/btns';

class MortgageFreeManager extends Component {
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
      </React.Fragment>
    );
  }
}

export default MortgageFreeManager;
