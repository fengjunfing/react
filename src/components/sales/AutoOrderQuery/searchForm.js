import React, { Component } from 'react';
import { Form, Input, Select, Divider, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonSearchForm from '@/components/common/SearchForm';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

class ComponentsAutoOrderQuerySearchForm extends Component {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    table: ImmutablePropTypes.list.isRequired,
    searchData: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool.isRequired,
    tableGet: PropTypes.func.isRequired,
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <CommonSearchForm {...this.props} loading={this.props.loading || this.props.table.some(t => t.get('loading'))}>
        <FormItem>
          {getFieldDecorator('orderNo')(
            <Input addonBefore={'订单编号'} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('customerName')(
            <Input addonBefore={'用户姓名'} />
          )}
        </FormItem>
        <FormItem>
          <Input addonBefore={'渠道名称'} className={'inputSelect'} addonAfter=
            {getFieldDecorator('channelId')(
              <Select style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                {
                  [].concat(this.props.channelNameList.toJS()).map(v => <Option key={v.id}>{v.name}</Option>)
                }
              </Select>
            )}
          />
        </FormItem>
        <FormItem>
          <Input addonBefore={'状态'} className={'inputSelect'} addonAfter=
            {getFieldDecorator('status')(
              <Select style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                {
                  [['', '所有']].concat(Object.entries(this.props.dictData.get('ORDER_STATUS').toJS())).map(t => <Option key={t[0]} value={t[0]}>{t[1]}</Option>)
                }
              </Select>
            )}
          />
        </FormItem>
        <Divider style={{ margin: '3px 0 -1px 0' }} />
        <FormItem>
          <Input addonBefore={'创建时间'} className="inputDate" addonAfter=
            {getFieldDecorator('createTime')(
              <RangePicker />
            )}
          />
        </FormItem>
        <FormItem>
          <Input addonBefore={'订单类型'} className={'inputSelect'} addonAfter=
            {getFieldDecorator('type')(
              <Select style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                {
                  [['', '所有']].concat(Object.entries(this.props.dictData.get('ORDER_TYPE').toJS())).map(t => <Option key={t[0]}>{t[1]}</Option>)
                }
              </Select>
            )}
          />
        </FormItem>
        <FormItem>
          <Input addonBefore={'车辆类型'} className={'inputSelect'} addonAfter=
            {getFieldDecorator('carType')(
              <Select style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                {
                  [['', '所有']].concat(Object.entries(this.props.dictData.get('CAR_TYPE').toJS())).map(t => <Option key={t[0]}>{t[1]}</Option>)
                }
              </Select>
            )}
          />
        </FormItem>
      </CommonSearchForm>
    );
  }
}

export default Form.create({
  mapPropsToFields(props) {
    const formData = props.searchData.toJS();
    const values = {};
    if (formData.createTimeStart && formData.createTimeEnd) {
      formData.createTime = [moment(formData.createTimeStart), moment(formData.createTimeEnd)];
      delete formData.createTimeStart;
      delete formData.createTimeEnd;
    }
    for (var v in formData) {
      values[v] = Form.createFormField({
        value: formData[v] === undefined ? '' : formData[v].constructor === Number ? '' + formData[v] : formData[v],
      });
    }
    return values;
  }
})(ComponentsAutoOrderQuerySearchForm);
