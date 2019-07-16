import React from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/cars/BrandsManager/searchForm';
import ThisTable from '@/containers/cars/BrandsManager/table';
import ThisForm from '@/containers/cars/BrandsManager/form';

const BrandsManager = () => (
  <React.Fragment>
    <ThisSearchForm />
    <Divider style={{ margin: '0 0 -1px 0' }} />
    <Divider style={{ margin: 0 }} />
    <ThisTable />
    <ThisForm />
  </React.Fragment>
);

export default BrandsManager;