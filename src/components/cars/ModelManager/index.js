import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/cars/ModelManager/searchForm';
import ThisTable from '@/containers/cars/ModelManager/table';
import ThisForm from '@/containers/cars/ModelManager/form';

class ModelManager extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={{ display: this.props.visible ? 'none' : 'block' }}>
          <ThisSearchForm />
          <Divider style={{ margin: '0 0 -1px 0' }} />
          <Divider style={{ margin: 0 }} />
          <ThisTable />
        </div>
        {this.props.visible && <ThisForm />}
      </React.Fragment>
    );
  }
}

export default ModelManager;
