import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Tooltip, Divider, Popconfirm } from 'antd';
import PagesTable from '@/components/common/PagesTable';

export default class ComponentsMortgageFreeManagerTable extends Component {
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
      title: '客户分类',
      dataIndex: 'name',
      customWidth: 60,
    }, {
      title: '分类编码',
      dataIndex: 'type',
      customWidth: 100,
      render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>,
    }, {
      title: '要求',
      dataIndex: 'requirement',
      width: 300,
      render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>,
    }, {
      title: '所需材料说明',
      dataIndex: 'requiredMaterialsDesc',
      width: 300,
      render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>,
    }, {
      title: '排序',
      dataIndex: 'sort',
      width: 100,
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
