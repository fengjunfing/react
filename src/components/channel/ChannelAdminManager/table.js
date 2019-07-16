import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Switch, Divider } from 'antd';
import PagesTable from '@/components/common/PagesTable';

export default class ComponentsChannelAdminManagerTable extends Component {
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
      title: '账号',
      dataIndex: 'loginName',
      width: 180,
    }, {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      width: 80,
    }, {
      title: '联系电话',
      dataIndex: 'phone',
      align: 'center',
      width: 180,
    }, {
      title: '所属渠道',
      dataIndex: 'channelName',
      align: 'center',
      width: 80,
    }, {
      title: '用户类型',
      dataIndex: 'userType',
      align: 'center',
      width: 80,
      render: text => this.props.dictData.get('USER_TYPE').get(text),
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
          <Divider type="vertical" />
          <a onClick={this.props.getPassword.bind(this, record)}>修改密码</a>
          <Divider type="vertical" />
          <a onClick={this.props.getConfig.bind(this, record)}>配置角色</a>
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
