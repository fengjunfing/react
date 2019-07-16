import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Switch, Divider } from 'antd';
import PagesTable from '@/components/common/PagesTable';

export default class ComponentsCommodityQueryTable extends Component {
  static propTypes  = {
    table: ImmutablePropTypes.list.isRequired,
    get: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }
  render() {
    let columns = [{
      title: '序号',
      key: 'index',
      align: 'center',
      width: 60,
      render: (...args) => args[2] + 1,
    }, {
      title: '商品名称',
      dataIndex: 'name',
      customWidth: 60,
    }, {
      title: '销售价格',
      dataIndex: 'salePrice',
      customWidth: 60,
    }, {
      title: '原始价格',
      dataIndex: 'originalPrice',
      customWidth: 60,
    }, {
      title: '总库存',
      dataIndex: 'totalStock',
      customWidth: 60,
    }, {
      title: '渠道名称',
      dataIndex: 'channelName',
      customWidth: 60,
    }, {
      title: '商户名称',
      dataIndex: 'merchantName',
      customWidth: 60,
    }, {
      title: '审核状态',
      dataIndex: 'auditStatus',
      customWidth: 60,
      render: text => this.props.dictData.get('AUDIT_STATUS').get(text),
    }, {
      title: '销售状态',
      dataIndex: 'status',
      align: 'center',
      width: 80,
      render: text => this.props.dictData.get('PRODUCT_STATUS').get(text),
    }, {
      title: '操作',
      width: 180,
      render: (text, record) => (
        <span>
          <a onClick={this.props.get.bind(this, record)}>查看</a>
          <Divider type="vertical" />
          <Switch size="small" disabled={record.auditStatus !== 'AGREE'} checkedChildren="上架" unCheckedChildren="下架" loading={record.loading} checked={record.status === 'UP' ? true : false} onChange={ record.status === 'UP' ? this.props.unpublish.bind(this, record) : this.props.publish.bind(this, record)} />
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
