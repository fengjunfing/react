import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PagesTable from '@/components/common/PagesTable';

export default class ComponentsReservationQueryTable extends Component {
  static propTypes  = {
    table: ImmutablePropTypes.list.isRequired,
    get: PropTypes.func.isRequired,
  }
  render() {
    let columns = [{
      title: '序号',
      key: 'index',
      align: 'center',
      width: 60,
      render: (...args) => args[2] + 1,
    }, {
      title: '客户姓名',
      dataIndex: 'customerName',
      width: 180,
    }, {
      title: '渠道名称',
      dataIndex: 'channelName',
      width: 180,
    }, {
      title: '客户手机号',
      dataIndex: 'customerPhone',
      width: 180,
    }, {
      title: '预约车型',
      dataIndex: 'carModelName',
      width: 180,
    }, {
      title: '总金额',
      dataIndex: 'totalAmount',
      width: 180,
      render: text => text && text + '元',
    }, {
      title: '预约时间',
      dataIndex: 'bespeakDate',
      width: 180,
    }, {
      title: '预约商户',
      dataIndex: 'merchantName',
      width: 180,
    }, {
      title: '金融方案',
      dataIndex: 'schemeName',
      width: 180,
    }, {
      title: '状态',
      dataIndex: 'status',
      width: 180,
      render: text => this.props.dictData.get('BESPEAK_STATUS').get(text),
    }, {
      title: '处理时间',
      dataIndex: 'handleTime',
      width: 180,
    }, {
      title: '操作',
      width: 180,
      render: (text, record) => (
        <span>
          <a onClick={this.props.get.bind(this, record)}>查看</a>
        </span>
      ),
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
      tablesHeight="310px"
    />;
  }
}
