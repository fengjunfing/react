import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Switch, Divider, Popconfirm } from 'antd';
import PagesTable from '@/components/common/PagesTable';
import moment from 'moment';

export default class ComponentsTicketManagerTable extends Component {
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
      title: '名称',
      dataIndex: 'name',
      customWidth: 60,
    }, {
      title: '渠道名称',
      dataIndex: 'channelName',
      customWidth: 60,
    }, {
      title: '卡券类型',
      dataIndex: 'ticketType',
      customWidth: 60,
      render: text => this.props.dictData.get('TICKET_TYPE').get(text),
    }, {
      title: '面值',
      dataIndex: 'faceValue',
      customWidth: 60,
      render: text => text && text + '元',
    }, {
      title: '总数量',
      dataIndex: 'quantity',
      customWidth: 60,
      render: text => text && text + '张',
    }, {
      title: '已发放数量',
      dataIndex: 'grantQuantity',
      customWidth: 60,
      render: text => text && text + '张',
    }, {
      title: '发布状态',
      dataIndex: 'releaseStatus',
      customWidth: 60,
      render: text => this.props.dictData.get('TICKET_RELEASE_STATUS').get(text),
    }, {
      title: '有效期',
      customWidth: 60,
      render: (text, record) => {
        switch (record.effectiveType) {
        case 'DAYS':
          return record.effectiveDays + '天';
        case 'DATE':
          return moment(record.effectiveDate).format('YYYY-MM-DD');
        default:
          return '';
        }
      }
    }, {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 80,
      render: (text, record) => (
        <Switch size="small" loading={record.loading} checked={text === 'y' ? true : false} onChange={ text === 'y' ? this.props.unpublish.bind(this, record) : this.props.publish.bind(this, record)} />
      )
    }, {
      title: '操作',
      width: 180,
      render: (text, record) => (
        <span>
          <a onClick={this.props.get.bind(this, record)}>编辑</a>
          {record.releaseStatus === 'UNPUBLISHED' && <React.Fragment>
            <Divider type="vertical" />
            <a onClick={this.props.publishTicket.bind(this, record)}>发布</a>
          </React.Fragment>}
          <Divider type="vertical" />
          <Popconfirm title={`是否确认删除 ${record.name}`} onConfirm={this.props.remove.bind(this, record)} okText="确定" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
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
      tablesHeight="350px"
    />;
  }
}
