import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/sales/TicketUseQuery/searchForm';
import ThisTable from '@/containers/sales/TicketUseQuery/table';
import ThisForm from '@/containers/sales/TicketUseQuery/form';

class TicketUseQuery extends Component {
  render() {
    return (
      <React.Fragment>
        <ThisSearchForm />
        <Divider style={{ margin: 0 }} />
        <ThisTable />
        <ThisForm />
      </React.Fragment>
    );
  }
}

export default TicketUseQuery;
