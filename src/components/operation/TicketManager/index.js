import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/operation/TicketManager/searchForm';
import ThisTable from '@/containers/operation/TicketManager/table';
import ThisForm from '@/containers/operation/TicketManager/form';
import ThisBtns from '@/containers/operation/TicketManager/btns';

class TicketManager extends Component {
  render() {
    return (
      <React.Fragment>
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

export default TicketManager;
