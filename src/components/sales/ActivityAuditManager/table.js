import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Divider } from 'antd';
import PagesTable from '@/components/common/PagesTable';
import moment from 'moment';

export default class ComponentsActivityAuditManagerTable extends Component {
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
      title: '活动名称',
      dataIndex: 'name',
      customWidth: 60,
    }, {
      title: '渠道名称',
      dataIndex: 'channelName',
      customWidth: 60,
    }, {
      title: '活动时间',
      customWidth: 60,
      render: (text, record) => (moment(record.startTime).format('YYYY-MM-DD') + ' 至 ' + moment(record.endTime).format('YYYY-MM-DD')),
    }, {
      title: '操作',
      width: 180,
      render: (text, record) => (
        <span>
          <a onClick={this.props.show.bind(this, record)}>活动预览</a>
          <Divider type="vertical" />
          <a onClick={this.props.get.bind(this, record)}>查看</a>
          <Divider type="vertical" />
          <a onClick={this.props.check.bind(this, record)}>审核</a>
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
