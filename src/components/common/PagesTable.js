import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const PagesTable = ({ rowkey, className, scroll, rowSelection, columns, tableGet, table, count, searchData, loading, tablesHeight, style, appendParams = [] }) => (
  <React.Fragment>
    {
      table && table.size ?
        <Table
          rowKey={rowkey || 'id'}
          className={`tables-height ${className ? className : scroll ? 'tablexscroll' : undefined}`}
          style={{
            '--tables-height': tablesHeight || 0,
            ...style,
          }}
          scroll={scroll || undefined}
          rowSelection={rowSelection ? rowSelection : undefined}
          columns={columns}
          dataSource={table.toJS()}
          loading={loading}
          size="middle"
          defaultExpandAllRows={true}
          bordered
          pagination={{
            showSizeChanger: true, showQuickJumper: true, pageSizeOptions: ['2', '5', '10', '20', '30', '40'],
            current: searchData.get('currentPage'), pageSize: searchData.get('pageSize'), total: count,
            showTotal: total => `共 ${total} 条数据`,
            onChange: nextPage => {
              tableGet({
                ...searchData.toJS(),
                currentPage: nextPage,
              }, ...appendParams);
            },
            onShowSizeChange: (currentPage, pageSize) => {
              tableGet({
                ...searchData.toJS(),
                currentPage: 1,
                pageSize: pageSize,
              }, ...appendParams);
            }
          }}
        /> :
        <div><Table columns={columns} size="middle" locale={{ emptyText: (table && !table.size) && !loading ? '数据为空' : '正在加载' }} /></div>
    }
  </React.Fragment>
);

PagesTable.propTypes = {
  table: ImmutablePropTypes.list.isRequired,
  count: PropTypes.number.isRequired,
  searchData: ImmutablePropTypes.map.isRequired,
  loading: PropTypes.bool.isRequired,
  tableGet: PropTypes.func.isRequired,
};

export default PagesTable;
