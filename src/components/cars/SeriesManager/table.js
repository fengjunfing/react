import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Switch } from 'antd';
import PagesTable from '@/components/common/PagesTable';
import style from './style.module.css';

export default class ComponentsBrandsManagerTable extends Component {
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
      title: '品牌名称',
      dataIndex: 'brandName',
      customWidth: 60,
    }, {
      title: '车系',
      dataIndex: 'name',
      customWidth: 200,
      render: (text, record) => (
        <span>{record.cover && <img className={style.icon} alt={record.name} src={record.cover} />}{record.name}</span>
      )
    }, {
      title: '车系组名',
      dataIndex: 'seriesGroupName',
      align: 'center',
      width: 80,
    }, {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 80,
      render: (text, record) => (
        <Switch size="small" loading={record.loading} checked={text === 'NORMAL' ? true : false} onChange={ text === 'NORMAL' ? this.props.unpublish.bind(this, record) : this.props.publish.bind(this, record)} />
      )
    }, {
      title: '操作',
      width: 180,
      render: (text, record) => (
        <span>
          <a onClick={this.props.get.bind(this, record)}>编辑</a>
          {/* <Divider type="vertical" />
          <Popconfirm title={`是否确认删除 ${record.name}`} onConfirm={this.props.remove.bind(this, record)} okText="确定" cancelText="取消">
            <a>删除</a>
          </Popconfirm> */}
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
