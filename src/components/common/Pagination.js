import React from 'react';
import { Pagination as AntdPagination } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Pagination = ({ tableGet, count, searchData, appendParams = [], size = 'small', style = {} }) => {
  const props = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['2', '5', '10', '20', '30', '40'],
    current: searchData.get('currentPage'),
    pageSize: searchData.get('pageSize'),
    total: count,
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
    },
    size,
    style: {
      textAlign: 'right',
      margin: '10px 0 10px 0',
      ...style,
    },
  };
  return (<AntdPagination {...props} />);
};

Pagination.propTypes = {
  table: ImmutablePropTypes.list.isRequired,
  count: PropTypes.number.isRequired,
  searchData: ImmutablePropTypes.map.isRequired,
  loading: PropTypes.bool.isRequired,
  tableGet: PropTypes.func.isRequired,
};

export default Pagination;
