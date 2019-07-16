import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Divider, Popconfirm } from 'antd';
import PagesTable from '@/components/common/PagesTable';
import moment from 'moment';

export default class ComponentsActivityManagerTable extends Component {
  static propTypes  = {
    table: ImmutablePropTypes.list.isRequired,
    get: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }
  statusDesc = record => {
    const { isCancel, status, auditStatus } = record;
    if (isCancel === 'y') {
      return '活动已失效';
    } else if (status === 'INIT') {
      return this.props.dictData.get('ACTIVITY_STATUS').get(status) + '（' + this.props.dictData.get('ACTIVITY_AUDIT_STATUS').get(auditStatus) + '）';
    }
    return this.props.dictData.get('ACTIVITY_STATUS').get(status);
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
      title: '活动时间',
      customWidth: 60,
      render: (text, record) => (moment(record.startTime).format('YYYY-MM-DD') + ' 至 ' + moment(record.endTime).format('YYYY-MM-DD')),
    }, {
      title: '渠道名称',
      dataIndex: 'channelName',
      customWidth: 60,
    }, {
      title: '状态',
      customWidth: 60,
      render: (text, record) => this.statusDesc(record),
    }, {
      title: '操作',
      width: 380,
      render: (text, record) => (
        <span>
          {
            (record.status === 'INIT' &&
              (record.auditStatus === 'WAIT_AUDIT' ||
                record.auditStatus === 'AUDIT_REJECT'
              ) &&
              record.isCancel === 'n'
            ) && <React.Fragment>
              <a onClick={this.props.edit.bind(this, record)}>编辑</a>
              <Divider type="vertical" />
            </React.Fragment>
          }
          <a onClick={this.props.show.bind(this, record)}>活动预览</a>
          <Divider type="vertical" />
          <a onClick={this.props.get.bind(this, record)}>查看</a>
          <Divider type="vertical" />
          <a onClick={this.props.copy.bind(this, record)}>拷贝</a>
          {
            ((record.status === 'INIT' &&
              (record.auditStatus === 'WAIT_AUDIT' ||
                record.auditStatus === 'AUDIT_REJECT'
              ) &&
              record.isCancel === 'n'
            ) || record.isCancel === 'y') && <React.Fragment>
              <Divider type="vertical" />
              <Popconfirm title={`是否确认删除 ${record.name}`} onConfirm={this.props.remove.bind(this, record)} okText="确定" cancelText="取消">
                <a>删除</a>
              </Popconfirm>
            </React.Fragment>
          }
          {
            (record.status === 'INIT' &&
              record.auditStatus === 'WAIT_AUDIT' &&
              record.isCancel === 'n'
            ) && <React.Fragment>
              <Divider type="vertical" />
              <Popconfirm title={`是否确认提交 ${record.name} 审核`} onConfirm={this.props.submitAudit.bind(this, record)} okText="确定" cancelText="取消">
                <a>提交审核</a>
              </Popconfirm>
            </React.Fragment>
          }
          {
            (record.status === 'INIT' &&
              record.auditStatus === 'AUDIT_PASS' &&
              record.isCancel === 'n'
            ) && <React.Fragment>
              <Divider type="vertical" />
              <Popconfirm title={`是否确认开启 ${record.name}`} onConfirm={this.props.publish.bind(this, record)} okText="确定" cancelText="取消">
                <a>开启</a>
              </Popconfirm>
            </React.Fragment>
          }
          {
            (record.status === 'INIT' &&
              record.auditStatus === 'AUDIT_REJECT' &&
              record.isCancel === 'n'
            ) && <React.Fragment>
              <Divider type="vertical" />
              <a onClick={this.props.getReject.bind(this, record)}>驳回原因</a>
            </React.Fragment>
          }
          {
            (record.status === 'STARTED' &&
              record.isCancel === 'n'
            ) && <React.Fragment>
              <Divider type="vertical" />
              <Popconfirm title={`是否确认停止 ${record.name} 活动`} onConfirm={this.props.unpublish.bind(this, record)} okText="确定" cancelText="取消">
                <a>停止活动</a>
              </Popconfirm>
            </React.Fragment>
          }
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
      tablesHeight="350px"
    />;
  }
}
