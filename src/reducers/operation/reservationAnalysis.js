import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import Actions from '@/actions';
import moment from 'moment';

const {
  thunk: thunkTypes,
  action: actionTypes,
} = Actions.RESERVATION_ANALYSIS;

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
  yAxis,
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
    const totalAmount = [];
    const maleCount = [];
    const femaleCount = [];

    const handleSeries = [];
    const totalCount_h = [];
    const flowCount = [];
    const loanCount = [];
    const fullCount = [];

    const xAxis = [];
    const xAxis_h = [];
    action.response.get('result').get('statisticsBespeakDays').forEach(v => {
      totalCount.push(v.get('totalCount'));
      totalAmount.push(v.get('totalAmount'));
      maleCount.push(v.get('maleCount'));
      femaleCount.push(v.get('femaleCount'));

      xAxis.push(moment(v.get('statisticsDate')).format('YYYY-MM-DD'));
    });

    action.response.get('result').get('statisticsBespeakHandleDays').forEach(v => {
      totalCount_h.push(v.get('totalCount'));
      flowCount.push(v.get('flowCount'));
      loanCount.push(v.get('loanCount'));
      fullCount.push(v.get('fullCount'));

      xAxis_h.push(moment(v.get('statisticsDate')).format('YYYY-MM-DD'));
    });

    countSeries.push({
      name: '总数量',
      type: 'line',
      color: ['#5D5EF5', '#f2f2f2'],
      data: totalCount
    });
    countSeries.push({
      name: '男数量',
      type: 'line',
      color: ['#F76A2E', '#f2f2f2'],
      data: maleCount
    });
    countSeries.push({
      name: '女数量',
      type: 'line',
      color: ['#01CA8B', '#f2f2f2'],
      data: femaleCount
    });
    countSeries.push({
      name: '金额',
      type: 'line',
      color: ['#EE3B3B', '#f2f2f2'],
      yAxisIndex: 1,
      data: totalAmount
    });

    handleSeries.push({
      name: '处理数量',
      type: 'line',
      color: ['#5D5EF5', '#f2f2f2'],
      data: totalCount_h
    });
    handleSeries.push({
      name: '流单数量',
      type: 'line',
      color: ['#F76A2E', '#f2f2f2'],
      data: flowCount
    });
    handleSeries.push({
      name: '贷款数量',
      type: 'line',
      color: ['#01CA8B', '#f2f2f2'],
      data: loanCount
    });
    handleSeries.push({
      name: '全款数量',
      type: 'line',
      color: ['#EE3B3B', '#f2f2f2'],
      data: fullCount
    });
    return state
      .set('loading', false)
      .set('orderDayCount', initCharts(['总数量', '男数量', '女数量', '金额'], xAxis, [
        {
          type: 'value',
          name: '数量',
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: '金额(万元)',
          axisLabel: {
            formatter: '{value}'
          }
        }
      ], countSeries))
      .set('orderDayAmount', initCharts(['处理数量', '流单数量', '贷款数量', '全款数量'], xAxis_h, {
        type: 'value',
        name: '数量',
        axisLabel: {
          formatter: '{value}'
        }
      }, handleSeries));
  case thunkTypes.queryStatisticsOrderDayList.FAILURETYPE:
    return state
      .set('loading', false);
  case thunkTypes.queryStatisticsOrderMonthsList.REQUESTTYPE:
    return state
      .set('loading', true);
  case thunkTypes.queryStatisticsOrderMonthsList.SUCCESSTYPE:
    const countSeriesM = [];
    const totalCountM = [];
    const totalAmountM = [];
    const maleCountM = [];
    const femaleCountM = [];

    const handleSeriesM = [];
    const totalCount_hM = [];
    const flowCountM = [];
    const loanCountM = [];
    const fullCountM = [];

    const xAxisM = [];
    const xAxis_hM = [];
    action.response.get('result').get('statisticsBespeakDays').forEach(v => {
      totalCountM.push(v.get('totalCount'));
      totalAmountM.push(v.get('totalAmount'));
      maleCountM.push(v.get('maleCount'));
      femaleCountM.push(v.get('femaleCount'));

      xAxisM.push(moment(v.get('statisticsDate')).format('YYYY-MM-DD'));
    });

    action.response.get('result').get('statisticsBespeakHandleDays').forEach(v => {
      totalCount_hM.push(v.get('totalCount'));
      flowCountM.push(v.get('flowCount'));
      loanCountM.push(v.get('loanCount'));
      fullCountM.push(v.get('fullCount'));

      xAxis_hM.push(moment(v.get('statisticsDate')).format('YYYY-MM-DD'));
    });

    countSeriesM.push({
      name: '总数量',
      type: 'line',
      color: ['#5D5EF5', '#f2f2f2'],
      data: totalCountM
    });
    countSeriesM.push({
      name: '男数量',
      type: 'line',
      color: ['#F76A2E', '#f2f2f2'],
      data: maleCountM
    });
    countSeriesM.push({
      name: '女数量',
      type: 'line',
      color: ['#01CA8B', '#f2f2f2'],
      data: femaleCountM
    });
    countSeriesM.push({
      name: '金额',
      type: 'line',
      color: ['#EE3B3B', '#f2f2f2'],
      yAxisIndex: 1,
      data: totalAmountM
    });

    handleSeriesM.push({
      name: '处理数量',
      type: 'line',
      color: ['#5D5EF5', '#f2f2f2'],
      data: totalCount_hM
    });
    handleSeriesM.push({
      name: '流单数量',
      type: 'line',
      color: ['#F76A2E', '#f2f2f2'],
      data: flowCountM
    });
    handleSeriesM.push({
      name: '贷款数量',
      type: 'line',
      color: ['#01CA8B', '#f2f2f2'],
      data: loanCountM
    });
    handleSeriesM.push({
      name: '全款数量',
      type: 'line',
      color: ['#EE3B3B', '#f2f2f2'],
      data: fullCountM
    });
    return state
      .set('loading', false)
      .set('orderMonthsCount', initCharts(['总数量', '男数量', '女数量', '金额'], xAxisM, [
        {
          type: 'value',
          name: '数量',
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: '金额(万元)',
          axisLabel: {
            formatter: '{value}'
          }
        }
      ], countSeriesM))
      .set('orderMonthsAmount', initCharts(['处理数量', '流单数量', '贷款数量', '全款数量'], xAxis_hM, {
        type: 'value',
        name: '数量',
        axisLabel: {
          formatter: '{value}'
        }
      }, handleSeriesM));
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
