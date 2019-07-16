import React, { Component } from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/channel/CommodityQuery/searchForm';
import ThisTable from '@/containers/channel/CommodityQuery/table';
// import ThisForm from '@/containers/channel/CommodityQuery/form';

class CommodityQuery extends Component {
  render() {
    return (
      <React.Fragment>
        <ThisSearchForm />
        <Divider style={{ margin: 0 }} />
        <ThisTable />
        {/* <ThisForm /> */}
      </React.Fragment>
    );
  }
}

export default CommodityQuery;
