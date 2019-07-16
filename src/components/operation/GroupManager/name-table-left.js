import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {  Tooltip } from 'antd';
import PagesTable from '@/components/common/PagesTable';

export default class ComponentsGroupManagerNameTableLeft extends Component {
  static propTypes = {
    table: ImmutablePropTypes.list.isRequired,
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
      width: 200,
      render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>,
    }, {
      title: '操作',
      width: 60,
      render: (text, record) => (
        <span>
          <a onClick={() => this.props.nameFormSetLeftData(record)}>选择</a>
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
      tablesHeight="410px"
    />;
  }
}
