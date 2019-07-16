import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Divider } from 'antd';
import SingleTable from '@/components/common/SingleTable';

export default class ComponentsFunctionManagerTable extends Component {
  static propTypes = {
    get: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    addChild: PropTypes.func.isRequired,
  }
  render() {
    let columns = [{
      title: '功能名称',
      dataIndex: 'name',
      customWidth: 200,
      render: (text, record) => (
        record.icon ? <React.Fragment><Icon type={record.icon} /><span style={{ marginLeft: 6 }}>{text}</span></React.Fragment> :
          text
      )
    }, {
      title: 'code',
      dataIndex: 'code',
      customWidth: 150,
    }, {
      title: 'URL',
      dataIndex: 'menuUrl',
      customWidth: 150,
    }, {
      title: '是否叶子',
      dataIndex: 'menuType',
      align: 'center',
      width: 80,
      render: text => text === 'leaf' ? '是' : '否',
    }, {
      title: '排序',
      dataIndex: 'sort',
      align: 'right',
      width: 60,
    }, {
      title: '操作',
      width: 140,
      render: (text, record) => (
        <span>
          <a onClick={this.props.get.bind(this, record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={this.props.remove.bind(this, record)}>删除</a>
          {
            record.menuType !== 'leaf' ?
              <React.Fragment>
                <Divider type="vertical" />
                <a onClick={this.props.addChild.bind(this, record)}>新增</a>
              </React.Fragment> : ''
          }
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
      tablesHeight="260px"
    />;
  }
}