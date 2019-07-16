import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/basis/SystemCategoryConf/searchForm';
import ThisTable from '@/containers/basis/SystemCategoryConf/table';
import ThisForm from '@/containers/basis/SystemCategoryConf/form';
import ThisBtns from '@/containers/basis/SystemCategoryConf/btns';

class SystemCategoryConf extends Component {
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

export default SystemCategoryConf;
