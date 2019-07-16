import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from '@/components/basic/BaseComponent';
import ThisIndex from '@/components/operation/ReservationAnalysis';
import Actions from '@/actions';
import moment from 'moment';

class ContainersReservationAnalysis extends BaseComponent {
  constructor (props) {
    super(props);
    this.map_count = null;
    this.map_amount = null;

    this.props.getOrderTotal();
    this.props.queryStatisticsOrderDayList({
      startDate: moment().add(-7, 'day').format('YYYY-MM-DD'),
      endDate: moment().add(-1, 'day').format('YYYY-MM-DD'),
    });
    this.props.queryStatisticsOrderMonthsList({
      startDate: moment().add(-12, 'month').format('YYYY-MM'),
      endDate: moment().add(-1, 'month').format('YYYY-MM'),
    });
  }

  changeMapDay = async (ref, container, [start = 1, end = 1] = [1, 1], date = false) => {

    let startDate, endDate;
    if (date) {
      startDate = start.format('YYYY-MM-DD');
      endDate = end.format('YYYY-MM-DD');
    } else {
      startDate = moment().add(-start, 'day').format('YYYY-MM-DD');
      endDate = moment().add(-end, 'day').format('YYYY-MM-DD');
    }

    let data = null;

    const isProvince = ref.currentMap.mapCode === '100000';

    if (isProvince) {
      data = await this.props.queryProvinceOrderList({ startDate, endDate })
        .then(res => res.get('result').toJS());
    } else {
      data = await this.props.queryCityOrderList({ startDate, endDate, belongRegion: ref.currentMap.mapCode })
        .then(res => res.get('result').toJS());
    }

    let valueKey;

    switch(container) {
    case 'map_count':
      valueKey = 'totalCount';
      break;
    case 'map_amount':
      valueKey = 'totalAmount';
      break;
    }

    const list = [];

    for (let i = 0; i < data.length; i++) {
      list[i] = {
        name: data[i].belongRegionName,
        value: data[i][valueKey]
      };
    }

    ref.setSeries(list);
    
    this.props.setList({
      name: container,
      list,
      flag: isProvince,
      params: {
        data: [start, end],
        date,
      },
    });
  }
  render() {
    return <ThisIndex {...this.props} changeMapDay={this.changeMapDay}/>;
  }
}

const mapStateToProps = state => {
  const data = state.getIn(['operation', 'reservationAnalysis']);
  return {
    total: data.getIn(['data', 'total']),
    orderDayCount: data.getIn(['data', 'orderDayCount']),
    orderDayAmount: data.getIn(['data', 'orderDayAmount']),
    orderMonthsCount: data.getIn(['data', 'orderMonthsCount']),
    orderMonthsAmount: data.getIn(['data', 'orderMonthsAmount']),
    map_count_list: data.getIn(['data', 'map_count_list']),
    map_amount_list: data.getIn(['data', 'map_amount_list']),
    map_count_flag: data.getIn(['data', 'map_count_flag']),
    map_amount_flag: data.getIn(['data', 'map_amount_flag']),
    map_count_params: data.getIn(['data', 'map_count_params']),
    map_amount_params: data.getIn(['data', 'map_amount_params']),
  };
};

const methods = Actions.RESERVATION_ANALYSIS;

const mapDispatchToProps = {
  getOrderTotal: methods.getOrderTotal,
  queryStatisticsOrderDayList: methods.queryStatisticsOrderDayList,
  queryStatisticsOrderMonthsList: methods.queryStatisticsOrderMonthsList,
  setList: methods.setList,
  queryProvinceOrderList: methods.queryProvinceOrderList,
  queryCityOrderList: methods.queryCityOrderList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersReservationAnalysis);
