import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PagesTable from '@/components/common/PagesTable';

export default class ComponentsICBCEOrderQueryTable extends Component {
  static propTypes  = {
    table: ImmutablePropTypes.list.isRequired,
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
      title: '订单号',
      dataIndex: 'orderNo',
      width: 180,
      fixed: 'left',
    }, {
      title: '融e购单号',
      dataIndex: 'eorderDetailNo',
      width: 180,
    }, {
      title: '下单时间',
      dataIndex: 'createTime',
      width: 180,
    }, {
      title: '用户姓名',
      dataIndex: 'customerName',
      width: 180,
    }, {
      title: '联系电话',
      dataIndex: 'customerPhone',
      width: 180,
    }, {
      title: '车型',
      dataIndex: 'carModelName',
      width: 180,
    }, {
      title: '应付金额',
      dataIndex: 'totalAmount',
      width: 180,
      render: text => text && text + '元',
    }, {
      title: '支付金额',
      dataIndex: 'totalPayment',
      width: 180,
      render: text => text && text + '元',
    }, {
      title: '支付卡号',
      dataIndex: 'bankCardNo',
      width: 180,
    }, {
      title: '经办销售员',
      dataIndex: 'salesperson',
      width: 180,
    }, {
      title: '商户名称',
      dataIndex: 'merchantName',
      width: 180,
    }, {
      title: '渠道名称',
      dataIndex: 'channelName',
      width: 180,
    }, {
      title: '支付状态',
      dataIndex: 'payStatus',
      width: 180,
      render: text => this.props.dictData.get('PAY_STATUS').get(text),
    }, {
      title: '支付用途',
      dataIndex: 'paymentPurpose',
      width: 180,
      render: text => this.props.dictData.get('PAYMENT_PURPOSE').get(text),
    }, {
      title: '支付类型',
      dataIndex: 'payType',
      width: 180,
      render: text => this.props.dictData.get('PAY_TYPE').get(text),
    }, {
      title: '退款状态',
      dataIndex: 'refundStatus',
      width: 180,
      render: text => this.props.dictData.get('REFUND_STATUS').get(text),
    }, {
      title: '退款金额',
      dataIndex: 'refundFee',
      width: 180,
      render: text => text && text + '元',
    }, {
      title: '期数',
      dataIndex: 'periods',
      width: 180,
    }, {
      title: '分期金额',
      dataIndex: 'instalmentAmount',
      width: 180,
      render: text => text && text + '元',
    }, {
      title: '月供金额',
      dataIndex: 'monthlyPayment',
      width: 180,
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
