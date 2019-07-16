import React, { Component } from 'react';
import { Form, Input, Select, Divider, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonSearchForm from '@/components/common/SearchForm';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

class ComponentsReservationQuerySearchForm extends Component {
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
          {getFieldDecorator('carModelName')(
            <Input addonBefore={'预约车型'} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('customerName')(
            <Input addonBefore={'用户姓名'} />
          )}
        </FormItem>
        <FormItem>
          <Input addonBefore={'状态'} className={'inputSelect'} addonAfter=
            {getFieldDecorator('status')(
              <Select style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                {
                  [['', '所有']].concat(Object.entries(this.props.dictData.get('BESPEAK_STATUS').toJS())).map(t => <Option key={t[0]} value={t[0]}>{t[1]}</Option>)
                }
              </Select>
            )}
          />
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
        <Divider style={{ margin: '3px 0 -1px 0' }} />
        <FormItem>
          <Input addonBefore={'预约时间'} className="inputDate" addonAfter=
            {getFieldDecorator('bespeakDate')(
              <RangePicker />
            )}
          />
        </FormItem>
        <FormItem>
          <Input addonBefore={'预约类型'} className={'inputSelect'} addonAfter=
            {getFieldDecorator('type')(
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
    if (formData.bespeakDateStart && formData.bespeakDateEnd) {
      formData.bespeakDate = [moment(formData.bespeakDateStart), moment(formData.bespeakDateEnd)];
      delete formData.bespeakDateStart;
      delete formData.bespeakDateEnd;
    }
    for (var v in formData) {
      values[v] = Form.createFormField({
        value: formData[v] === undefined ? '' : formData[v].constructor === Number ? '' + formData[v] : formData[v],
      });
    }
    return values;
  }
})(ComponentsReservationQuerySearchForm);
