import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PagesTable from '@/components/common/PagesTable';

export default class ComponentsAutoOrderQueryTable extends Component {
  static propTypes = {
    table: ImmutablePropTypes.list.isRequired,
    get: PropTypes.func.isRequired,
  }
  render() {
    let columns = [{
      title: '序号',
      key: 'index',
      align: 'center',
      width: 60,
      fixed: 'left',
      render: (...args) => args[2] + 1,
    }, {
      title: '订单编号',
      dataIndex: 'orderNo',
      width: 180,
      fixed: 'left',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 180,
    }, {
      title: '用户姓名',
      dataIndex: 'customerName',
      width: 180,
    }, {
      title: '渠道名称',
      dataIndex: 'channelName',
      width: 180,
    }, {
      title: '用户手机号',
      dataIndex: 'customerPhone',
      width: 180,
    }, {
      title: '车型名称',
      dataIndex: 'productName',
      width: 180,
    }, {
      title: '车辆类型',
      dataIndex: 'carType',
      width: 180,
      render: text => this.props.dictData.get('CAR_TYPE').get(text),
    }, {
      title: '总金额',
      dataIndex: 'totalAmount',
      width: 180,
      render: text => text && text + '元',
    }, {
      title: '商户名称',
      dataIndex: 'merchantName',
      width: 180,
    }, {
      title: '订单类型',
      dataIndex: 'type',
      width: 180,
      render: text => this.props.dictData.get('ORDER_TYPE').get(text),
    }, {
      title: '首付金额',
      dataIndex: 'firstPayment',
      width: 180,
      render: (text, record) => record.type === 'loan' && text,
    }, {
      title: '期数',
      dataIndex: 'periods',
      width: 180,
      render: (text, record) => record.type === 'loan' && text,
    }, {
      title: '贷款金额',
      dataIndex: 'loanAmount',
      width: 180,
      render: (text, record) => record.type === 'loan' && text,
    }, {
      title: '状态',
      dataIndex: 'status',
      width: 180,
      render: text => this.props.dictData.get('ORDER_STATUS').get(text),
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
      className="tablexscroll"
      scroll={{
        x: columns.reduce((prev, next) => prev + (next.width || next.customWidth), 0), // width为空时，customWidth为必填;
        y: true,
      }}
      tablesHeight="310px"
    />;
  }
}
