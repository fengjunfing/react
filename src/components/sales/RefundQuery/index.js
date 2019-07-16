import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/sales/RefundQuery/searchForm';
import ThisTable from '@/containers/sales/RefundQuery/table';
import ThisForm from '@/containers/sales/RefundQuery/form';

class RefundQuery extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={{ display: this.props.visible ? 'none' : 'block' }}>
          <ThisSearchForm />
          <Divider style={{ margin: '0 0 -1px 0' }} />
          <ThisTable />
        </div>
        {this.props.visible && <ThisForm />}
      </React.Fragment>
    );
  }
}

export default RefundQuery;
