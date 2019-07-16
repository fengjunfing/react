import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PagesTable from '@/components/common/PagesTable';
import moment from 'moment';

export default class ComponentsTicketUseQueryTable extends Component {
  static propTypes  = {
    table: ImmutablePropTypes.list.isRequired,
  }
  render() {
    let columns = [{
      title: '序号',
      key: 'index',
      align: 'center',
      width: 60,
      render: (...args) => args[2] + 1,
    }, {
      title: '券编号',
      dataIndex: 'ticketNo',
      customWidth: 60,
    }, {
      title: '使用日期',
      dataIndex: 'usedDate',
      customWidth: 60,
      render: text => text && moment(text).format('YYYY-MM-DD'),
    }, {
      title: '商户名称',
      dataIndex: 'merchantName',
      customWidth: 60,
    }, {
      title: '姓名',
      dataIndex: 'userName',
      customWidth: 60,
    }, {
      title: '手机号',
      dataIndex: 'userPhone',
      customWidth: 60,
    }, {
      title: '渠道名称',
      dataIndex: 'channelName',
      customWidth: 60,
    }, {
      title: '车牌',
      dataIndex: 'plateNumber',
      customWidth: 60,
    }, {
      title: '面值金额',
      dataIndex: 'faceValue',
      customWidth: 60,
      render: text => text && text + '元',
    }];
    return <PagesTable
      {...this.props}
      count={this.props.count}
      columns={columns}
      loading={this.props.loading || this.props.table.some(t => t.get('loading'))}
      className={'tablexscroll'}
      scroll={{
        x: columns.reduce((prev, next) => prev + (next.width || next.customWidth), 0), // width为空时，customWidth为必填;
        y: true,
      }}
      tablesHeight="350px"
    />;
  }
}
