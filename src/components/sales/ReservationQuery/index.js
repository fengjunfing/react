import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/sales/ReservationQuery/searchForm';
import ThisTable from '@/containers/sales/ReservationQuery/table';
import ThisForm from '@/containers/sales/ReservationQuery/form';

class ReservationQuery extends Component {
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

export default ReservationQuery;
