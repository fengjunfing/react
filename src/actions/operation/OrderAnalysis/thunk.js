import THISACTION from './name';
import { transToThunk } from '@/util';

const thunk = {
  getOrderTotal: transToThunk(THISACTION + 'GET_ORDER_TOTAL'),
  queryStatisticsOrderDayList: transToThunk(THISACTION + 'QUERY_STATISTICS_ORDER_DAY_LIST'),
  queryStatisticsOrderMonthsList: transToThunk(THISACTION + 'QUERY_STATISTICS_ORDER_MONTHS_LIST'),
  queryProvinceOrderList: transToThunk(THISACTION + 'QUERY_PROVINCE_ORDER_LIST'),
  queryCityOrderList: transToThunk(THISACTION + 'QUERY_CITY_ORDER_LIST'),
};

const getOrderTotal = params => dispatch => dispatch({
  [THISACTION + 'GET_ORDER_TOTAL']: {
    types: Object.values(thunk.getOrderTotal),
    url: 'orderAnalysis/getOrderTotal',
    params,
  }
});

const queryStatisticsOrderDayList = params => dispatch => dispatch({
  [THISACTION + 'QUERY_STATISTICS_ORDER_DAY_LIST']: {
    types: Object.values(thunk.queryStatisticsOrderDayList),
    url: 'orderAnalysis/queryStatisticsOrderDayList',
    params,
  }
});

const queryStatisticsOrderMonthsList = params => dispatch => dispatch({
  [THISACTION + 'QUERY_STATISTICS_ORDER_MONTHS_LIST']: {
    types: Object.values(thunk.queryStatisticsOrderMonthsList),
    url: 'orderAnalysis/queryStatisticsOrderMonthsList',
    params,
  }
});

const queryProvinceOrderList = params => dispatch => dispatch({
  [THISACTION + 'QUERY_PROVINCE_ORDER_LIST']: {
    types: Object.values(thunk.queryProvinceOrderList),
    url: 'orderAnalysis/queryProvinceOrderList',
    params,
  }
});

const queryCityOrderList = params => dispatch => dispatch({
  [THISACTION + 'QUERY_CITY_ORDER_LIST']: {
    types: Object.values(thunk.queryCityOrderList),
    url: 'orderAnalysis/queryCityOrderList',
    params,
  }
});

export default {
  thunk,
  getOrderTotal,
  queryStatisticsOrderDayList,
  queryStatisticsOrderMonthsList,
  queryProvinceOrderList,
  queryCityOrderList,
};
