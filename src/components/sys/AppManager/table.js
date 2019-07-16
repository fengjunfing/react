import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Switch, Tooltip, Avatar } from 'antd';
import SingleTable from '@/components/common/SingleTable';

export default class ComponentsAppManagerTable extends Component {
  static propTypes  = {
    table: ImmutablePropTypes.list.isRequired,
    get: PropTypes.func.isRequired,
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
      title: 'logo',
      dataIndex: 'logo',
      align: 'center',
      width: 60,
      render: (text, record) => (
        <span>
          {
            !text ? '' : 
              <a onClick={this.props.show.bind(this, text, record, 'logo')}>
                <Avatar src={text} />
              </a>
          }
        </span>
      )
    }, {
      title: '名称',
      dataIndex: 'name',
      customWidth: 120,
    }, {
      title: 'code',
      dataIndex: 'appCode',
      customWidth: 120,
    }, {
      title: 'url',
      dataIndex: 'url',
      customWidth: 120,
      render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>,
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
      width: 60,
      render: (text, record) => (
        <span>
          <a onClick={this.props.get.bind(this, record)}>编辑</a>
        </span>
      ),
    }];
    return <SingleTable
      {...this.props}
      columns={columns}
      loading={this.props.loading || this.props.table.some(t => t.get('loading'))}
      className={'tablexscroll'}
      scroll={{
        x: columns.reduce((prev, next) => prev + (next.width || next.customWidth), 0), // width为空时，customWidth为必填;
        y: true,
      }}
      tablesHeight="200px"
    />;
  }
}