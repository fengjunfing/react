import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/sales/FinProjectManager/searchForm';
import ThisTable from '@/containers/sales/FinProjectManager/table';
import ThisForm from '@/containers/sales/FinProjectManager/form';
import ThisBtns from '@/containers/sales/FinProjectManager/btns';
import ThisDetailForm from '@/containers/sales/FinProjectManager/detailForm';
import ThisCarForm from '@/containers/sales/FinProjectManager/carForm';

class FinProjectManager extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={{ display: this.props.visible ? 'none' : 'block' }}>
          <ThisSearchForm />
          <Divider style={{ margin: '0 0 -1px 0' }} />
          <ThisBtns />
          <Divider style={{ margin: 0 }} />
          <ThisTable />
          <ThisCarForm />
        </div>
        {this.props.visible && <React.Fragment>
          <ThisForm />
          <ThisDetailForm />
        </React.Fragment>}
      </React.Fragment>
    );
  }
}

export default FinProjectManager;
