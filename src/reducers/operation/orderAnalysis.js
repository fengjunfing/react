import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import Actions from '@/actions';
import moment from 'moment';

const {
  thunk: thunkTypes,
  action: actionTypes,
} = Actions.ORDER_ANALYSIS;

const dataInitState = Immutable.fromJS({
  total: {},
  orderDayCount: {},
  orderDayAmount: {},
  orderMonthsCount: {},
  orderMonthsAmount: {},
  map_count_list: [],
  map_amount_list: [],
  map_count_flag: true,
  map_amount_flag: true,
  map_count_params: {},
  map_amount_params: {},
});

const initCharts = (legend, xAxis, yAxis, series) => Immutable.fromJS({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: '1',
    borderColor: '#f2f2f2',
    textStyle: {
      color: '#606266',
      fontSize: '12px'
    }
  },
  legend: {
    data: legend,
    left: '0%'
  },
  grid: {
    left: '4%',
    right: '10%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: xAxis,
    axisLine: {
      lineStyle: {
        color: '#909399'
      }
    }
  },
  yAxis: {
    type: 'value',
    name: yAxis,
    axisLine: {
      lineStyle: {
        color: '#909399'
      }
    }
  },
  series,
});

const data = (state = dataInitState, action) => {
  switch (action.type) {
  case thunkTypes.getOrderTotal.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.getOrderTotal.SUCCESSTYPE:
    return state
      .set('loading', false)
      .set('total', action.response.get('result'));
  case thunkTypes.getOrderTotal.FAILURETYPE:
    return state
      .set('loading', false);
  case thunkTypes.queryStatisticsOrderDayList.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.queryStatisticsOrderDayList.SUCCESSTYPE:
    const countSeries = [];
    const totalCount = [];
    const fullCount = [];
    const loanCount = [];

    const amountSeries= [];
    const totalAmount = [];
    const fullAmount = [];
    const loanAmount = [];

    const xAxis = [];
    action.response.get('result').forEach(v => {
      totalCount.push(v.get('totalCount'));
      fullCount.push(v.get('fullCount'));
      loanCount.push(v.get('loanCount'));

      totalAmount.push(v.get('totalAmount'));
      fullAmount.push(v.get('fullAmount'));
      loanAmount.push(v.get('loanAmount'));

      xAxis.push(moment(v.get('statisticsDate')).format('YYYY-MM-DD'));
    });

    countSeries.push({
      name: '总订单',
      type: 'line',
      color: ['#5D5EF5', '#f2f2f2'],
      data: totalCount
    });
    countSeries.push({
      name: '全款订单',
      type: 'line',
      color: ['#F76A2E', '#f2f2f2'],
      data: fullCount
    });
    countSeries.push({
      name: '贷款订单',
      type: 'line',
      color: ['#01CA8B', '#f2f2f2'],
      data: loanCount
    });

    amountSeries.push({
      name: '总订单',
      type: 'line',
      color: ['#5D5EF5', '#f2f2f2'],
      data: totalAmount
    });
    amountSeries.push({
      name: '全款订单',
      type: 'line',
      color: ['#F76A2E', '#f2f2f2'],
      data: fullAmount
    });
    amountSeries.push({
      name: '贷款订单',
      type: 'line',
      color: ['#01CA8B', '#f2f2f2'],
      data: loanAmount
    });
    return state
      .set('loading', false)
      .set('orderDayCount', initCharts(['总订单', '全款订单', '贷款订单'], xAxis, '数量', countSeries))
      .set('orderDayAmount', initCharts(['总订单', '全款订单', '贷款订单'], xAxis, '金额(元)', amountSeries));
  case thunkTypes.queryStatisticsOrderDayList.FAILURETYPE:
    return state
      .set('loading', false);
  case thunkTypes.queryStatisticsOrderMonthsList.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.queryStatisticsOrderMonthsList.SUCCESSTYPE:
    const xAxisM = [];
    const seriesCountM = [];
    const totalCountM = [];
    const fullCountM = [];
    const loanCountM = [];
    const seriesAmountM = [];
    const totalAmountM = [];
    const fullAmountM = [];
    const loanAmountM = [];
    action.response.get('result').forEach(v => {
      totalCountM.push(v.get('totalCount'));
      fullCountM.push(v.get('fullCount'));
      loanCountM.push(v.get('loanCount'));

      totalAmountM.push(v.get('totalAmount'));
      fullAmountM.push(v.get('fullAmount'));
      loanAmountM.push(v.get('loanAmount'));

      xAxisM.push(moment(v.get('statisticsDate')).format('YYYY-MM'));
    });

    seriesCountM.push({
      name: '总订单',
      type: 'line',
      color: ['#5D5EF5', '#f2f2f2'],
      data: totalCountM
    });
    seriesCountM.push({
      name: '全款订单',
      type: 'line',
      color: ['#F76A2E', '#f2f2f2'],
      data: fullCountM
    });
    seriesCountM.push({
      name: '贷款订单',
      type: 'line',
      color: ['#01CA8B', '#f2f2f2'],
      data: loanCountM
    });

    seriesAmountM.push({
      name: '总订单',
      type: 'line',
      color: ['#5D5EF5', '#f2f2f2'],
      data: totalAmountM
    });
    seriesAmountM.push({
      name: '全款订单',
      type: 'line',
      color: ['#F76A2E', '#f2f2f2'],
      data: fullAmountM
    });
    seriesAmountM.push({
      name: '贷款订单',
      type: 'line',
      color: ['#01CA8B', '#f2f2f2'],
      data: loanAmountM
    });
    return state
      .set('loading', false)
      .set('orderMonthsCount', initCharts(['总订单', '全款订单', '贷款订单'], xAxisM, '数量', seriesCountM))
      .set('orderMonthsAmount', initCharts(['总订单', '全款订单', '贷款订单'], xAxisM, '金额(元)', seriesAmountM));
  case thunkTypes.queryStatisticsOrderMonthsList.FAILURETYPE:
    return state
      .set('loading', false);
  case actionTypes.SET_LIST:
    return state
      .set(action.params.name + '_list' , Immutable.fromJS(action.params.list))
      .set(action.params.name + '_flag' , action.params.flag)
      .set(action.params.name + '_params' , action.params.params);
  default:
    return state;
  }
};

export default combineReducers({
  data,
});
