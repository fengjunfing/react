import React, { Component } from 'react';
import { Row, Col, Radio, DatePicker, Table, notification } from 'antd';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import TopCard from './TopCard';
import styles from './styles.module.sass';
import ReactEchartsMapChina from 'react-echarts-map-china';

const { RangePicker } = DatePicker;

class ReservationAnalysis extends Component {
  map_count_ref = null
  map_amount_ref = null

  componentDidMount () {
    this.props.changeMapDay(this.map_count_ref, 'map_count', []);
  }

  state = {
    map_count: '1',
    map_amount: '1',
  }
  handleDisabledDate = date => {
    const startDate = moment(new Date()).add(-1, 'day');
    if (!date || !startDate) {
      return false;
    }
    return startDate.isBefore(date);
  }
  render() {
    const { map_count_flag } = this.props;
    const columns = [
      {
        title: '排名',
        key: 'index',
        align: 'center',
        width: 60,
        render: (...args) => args[2] + 1,
      },
      {
        title: map_count_flag ? '省份' : '城市',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '预约数量',
        dataIndex: 'value',
        key: 'value',
      },
    ];
    const opt = {
      visualMap: {
        text:['高', '低'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered']
        }
      },
      tooltip: {
        trigger: 'item',
        formatter (params) {
          if (Number.isNaN(params.value)) {
            return '暂无数据';
          } else {
            return params.name + '<br/>'+ params.value;
          }
        },
      },
    };
    return (
      <React.Fragment>
        <Row>
          <Col span={8} style={{ padding: '10px', paddingRight: 0 }}><TopCard type="AMOUNT" data={this.props.total} /></Col>
          <Col span={8} style={{ padding: '10px', paddingRight: 0 }}><TopCard type="SEX" data={this.props.total} /></Col>
          <Col span={8} style={{ padding: '10px' }}><TopCard type="HANDLE" data={this.props.total} /></Col>
        </Row>
        <div className={styles['title-s']}>
          预约日分析
          <Radio.Group style={{ float: 'right' }} defaultValue="7" onChange={v => {
            this.props.queryStatisticsOrderDayList({
              startDate: moment().add(-v.target.value, 'day').format('YYYY-MM-DD'),
              endDate: moment().add(-1, 'day').format('YYYY-MM-DD'),
            });
          }}>
            <Radio.Button value="7">最近7天</Radio.Button>
            <Radio.Button value="30">最近30天</Radio.Button>
          </Radio.Group>
        </div>
        <Row>
          <Col span={12} style={{ padding: '10px', paddingRight: 0 }}>
            <div className={styles['box-wrapper']}>
              <div>预约数量</div>
              <ReactEcharts option={this.props.orderDayCount.toJS()} />
            </div>
          </Col>
          <Col span={12} style={{ padding: '10px' }}>
            <div className={styles['box-wrapper']}>
              <div>预约处理</div>
              <ReactEcharts option={this.props.orderDayAmount.toJS()} />
            </div>
          </Col>
        </Row>
        <div className={styles['title-s']}>
          预约月分析
        </div>
        <Row>
          <Col span={12} style={{ padding: '10px', paddingRight: 0 }}>
            <div className={styles['box-wrapper']}>
              <div>预约数量</div>
              <ReactEcharts option={this.props.orderMonthsCount.toJS()} />
            </div>
          </Col>
          <Col span={12} style={{ padding: '10px' }}>
            <div className={styles['box-wrapper']}>
              <div>预约处理</div>
              <ReactEcharts option={this.props.orderMonthsAmount.toJS()} />
            </div>
          </Col>
        </Row>
        <div className={styles['box-wrapper']} style={{ margin: 10 }}>
          <div className={styles['title-s']}>
            各地区预约数据统计
            <span style={{ float: 'right' }}>
              <RangePicker style={{ marginRight: 10 }} value={typeof this.state.map_count === 'string' ? [] : this.state.map_count} disabledDate={this.handleDisabledDate} onChange={v => {
                if (v.length === 0) {
                  this.setState({ map_count: '1' });
                  return this.props.changeMapDay(this.map_count_ref, 'map_count', [1, 1]);
                }
                this.setState({ map_count: v });
                return this.props.changeMapDay(this.map_count_ref, 'map_count', v, true);
              }} />
              <Radio.Group value={this.state.map_count} onChange={v => {
                this.setState({ map_count: v.target.value });
                this.props.changeMapDay(this.map_count_ref, 'map_count', [v.target.value, 1]);
              }}>
                <Radio.Button value="1">昨天</Radio.Button>
                <Radio.Button value="7">最近7天</Radio.Button>
                <Radio.Button value="30">最近30天</Radio.Button>
              </Radio.Group>
            </span>
          </div>
          <Row>
            <Col span={16}>
              <ReactEchartsMapChina
                ref={ref => this.map_count_ref = ref}
                option={opt}
                loadData={() => this.props.changeMapDay(this.map_count_ref, 'map_count', this.props.map_count_params.data, this.props.map_count_params.date)}
                getWarnMessage={message => message !== '0000' && notification.error({
                  message: '错误',
                  description: message,
                })}
                getData={list => {
                  this.props.setList({
                    name: 'map_count',
                    list,
                    flag: this.map_count_ref.currentMap.mapCode === '100000',
                    params: {
                      data: this.props.map_count_params.data,
                      date: this.props.map_count_params.date,
                    },
                  });
                }}
                style={{ height: 400 }}
              />
            </Col>
            <Col span={8}>
              <Table style={{ height: 400, overflowY: 'auto' }} dataSource={this.props.map_count_list.toJS()} columns={columns} pagination={false} />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default ReservationAnalysis;
