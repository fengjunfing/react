import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Divider, Popconfirm, Tooltip } from 'antd';
import SingleTable from '@/components/common/SingleTable';

export default class ComponentsBankManagerTable extends Component {
  static propTypes  = {
    table: ImmutablePropTypes.list.isRequired,
    get: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }
  render() {
    let columns = [{
      title: '全称',
      dataIndex: 'fullName',
      customWidth: 200,
      render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>,
    }, {
      title: '简称',
      dataIndex: 'name',
      customWidth: 60,
    }, {
      title: '联系人姓名',
      dataIndex: 'contactsName',
      customWidth: 60,
    }, {
      title: '联系人手机',
      dataIndex: 'contactsPhone',
      customWidth: 100,
    }, {
      title: '区域名称',
      dataIndex: 'belongRegionName',
      customWidth: 100,
      render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>,
    }, {
      title: '网点编号',
      dataIndex: 'netCode',
      customWidth: 100,
    }, {
      title: '操作',
      width: 180,
      render: (text, record) => (
        <span>
          <a onClick={this.props.get.bind(this, record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title={`是否确认删除 ${record.name}`} onConfirm={this.props.remove.bind(this, record)} okText="确定" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          <a onClick={this.props.add.bind(this, record)}>新增</a>
        </span>
      ),
    }];
    return <SingleTable
      {...this.props}
      columns={columns}
      className={'tablexscroll'}
      scroll={{
        x: columns.reduce((prev, next) => prev + (next.width || next.customWidth), 0), // width为空时，customWidth为必填;
        y: true,
      }}
      tablesHeight="250px"
    />;
  }
}
