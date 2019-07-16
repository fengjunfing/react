import React from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/cars/SeriesManager/searchForm';
import ThisTable from '@/containers/cars/SeriesManager/table';
import ThisForm from '@/containers/cars/SeriesManager/form';

const SeriesManager = () => (
  <React.Fragment>
    <ThisSearchForm />
    <Divider style={{ margin: '0 0 -1px 0' }} />
    <Divider style={{ margin: 0 }} />
    <ThisTable />
    <ThisForm />
  </React.Fragment>
);

export default SeriesManager;
