import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Divider, Switch } from 'antd';
import PagesTable from '@/components/common/PagesTable';

export default class ComponentsUserManagerTable extends Component {
  static propTypes  = {
    table: ImmutablePropTypes.list.isRequired,
    get: PropTypes.func.isRequired,
    getPassword: PropTypes.func.isRequired,
    tablePublish: PropTypes.func.isRequired,
    tableUnpublish: PropTypes.func.isRequired,
  }
  render() {
    let columns = [{
      title: '序号',
      key: 'index',
      align: 'center',
      width: 60,
      render: (...args) => args[2] + 1,
    }, {
      title: '帐号',
      dataIndex: 'loginName',
      customWidth: 200,
    }, {
      title: '姓名',
      dataIndex: 'name',
      customWidth: 100,
    }, {
      title: '手机号码',
      dataIndex: 'phone',
      width: 120,
    }, {
      title: '是否使用',
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
          <Divider type="vertical" />
          <a onClick={this.props.getPassword.bind(this, record)}>修改密码</a>
          <Divider type="vertical" />
          <a onClick={this.props.getConfig.bind(this, record)}>配置角色</a>
        </span>
      ),
    }];
    return <PagesTable
      {...this.props}
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