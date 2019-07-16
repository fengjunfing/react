import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Icon, Tooltip } from 'antd';
import PagesTable from '@/components/common/PagesTable';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class ContainersRoleManagerTable extends Component {
  static propTypes  = {
    dictData: ImmutablePropTypes.map.isRequired,
    get: PropTypes.func.isRequired,
    getConfig: PropTypes.func.isRequired,
    getFunc: PropTypes.func.isRequired,
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
      title: '角色名称',
      dataIndex: 'name',
      customWidth: 100,
      render: (text, record) => (
        record.icon ?
          <React.Fragment><Icon type={record.icon} /><span style={{ marginLeft: 6 }}>{text}</span></React.Fragment> :
          text
      )
    }, {
      title: '应用名称',
      dataIndex: 'appName',
      align: 'center',
      customWidth: 100,
    }, {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
      width: 100,
      render: text => this.props.dictData.getIn(['roleManager_type', text]),
    }, {
      title: '备注',
      dataIndex: 'remarks',
      customWidth: 200,
      render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>,
    }, {
      title: '操作',
      width: 220,
      render: (text, record) => (
        <span>
          <a onClick={this.props.get.bind(this, record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={this.props.getConfig.bind(this, record)}>配置菜单</a>
          <Divider type="vertical" />
          <a onClick={this.props.getFunc.bind(this, record)}>配置功能</a>
          <Divider type="vertical" />
          <a onClick={this.props.remove.bind(this, record)}>删除</a>
        </span>
      ),
    }];
    return <PagesTable
      {...this.props}
      columns={columns}
      className={'tablexscroll'}
      scroll={{
        x: columns.reduce((prev, next) => prev + (next.width || next.customWidth), 0), // width为空时，customWidth为必填;
        y: true,
      }}
      tablesHeight="310px"
    />;
  }
}