import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Icon, Divider, Tooltip } from 'antd';
import SingleTable from '@/components/common/SingleTable';

export default class ComponentsDictManagerTable extends Component {
  static propTypes = {
    childTableVisible: PropTypes.bool.isRequired,
    childTableSearchData: ImmutablePropTypes.map.isRequired,
    get: PropTypes.func.isRequired,
    read: PropTypes.func.isRequired,
    addChild: PropTypes.func.isRequired,
  }
  render() {
    let columns = [{
      title: '类型名称',
      dataIndex: 'typeName',
      customWidth: 200,
      render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>,
    }, {
      title: '操作',
      width: 200,
      render: (text, record) => (
        <span>
          <a onClick={this.props.get.bind(this, record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={this.props.addChild.bind(this, record)}>新增</a>
          <Divider type="vertical" />
          {
            this.props.childTableVisible ?
              this.props.childTableSearchData.get('typeCode') === record.typeCode ?
                <span><Icon type="folder-open" /> 当前字典...</span> :
                <a onClick={this.props.read.bind(this, record)}>切换字典</a> :
              <a onClick={this.props.read.bind(this, record)}>查看字典</a>
          }
        </span>
      ),
    }];
    if (!this.props.childTableVisible) {
      columns.splice(1, 0, {
        title: '类型代码',
        dataIndex: 'typeCode',
        customWidth: 200,
        render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>,
      }, {
        title: '排序',
        dataIndex: 'sort',
        align: 'right',
        width: 60,
      });
    }
    return <SingleTable
      {...this.props}
      columns={columns}
      className={'tablexscroll'}
      scroll={{
        x: columns.reduce((prev, next) => prev + (next.width || next.customWidth), 0), // width为空时，customWidth为必填;
        y: true,
      }}
      tablesHeight="200px"
    />;
  }
}