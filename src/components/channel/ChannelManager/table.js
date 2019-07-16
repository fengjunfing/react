import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Switch, Divider } from 'antd';
import PagesTable from '@/components/common/PagesTable';

export default class ComponentsChannelManagerTable extends Component {
  static propTypes  = {
    table: ImmutablePropTypes.list.isRequired,
    look: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired,
    config: PropTypes.func.isRequired,
  }
  render() {
    let columns = [{
      title: '序号',
      key: 'index',
      align: 'center',
      width: 60,
      render: (...args) => args[2] + 1,
    }, {
      title: '渠道名称',
      dataIndex: 'name',
      customWidth: 60,
    }, {
      title: '渠道编号',
      dataIndex: 'channelNo',
      customWidth: 80,
    }, {
      title: '负责人',
      dataIndex: 'contactsName',
      align: 'center',
      width: 80,
    }, {
      title: '电话',
      dataIndex: 'contactsPhone',
      align: 'center',
      width: 120,
    }, {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 80,
      render: (text, record) => (
        <Switch size="small" loading={record.loading} checked={text === 'y' ? true : false} onChange={ text === 'y' ? this.props.unpublish.bind(this, record) : this.props.publish.bind(this, record)} />
      )
    }, {
      title: '描述',
      dataIndex: 'description',
      align: 'center',
      width: 200,
    }, {
      title: '操作',
      width: 180,
      render: (text, record) => (
        <span>
          <a onClick={this.props.look.bind(this, record)}>详情</a>
          <Divider type="vertical" />
          <a onClick={this.props.get.bind(this, record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={this.props.config.bind(this, record)}>配置</a>
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
      tablesHeight="250px"
    />;
  }
}
