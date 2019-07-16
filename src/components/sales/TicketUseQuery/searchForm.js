import React, { Component } from 'react';
import { Form, Input, Select, Divider, DatePicker, Button } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonSearchForm from '@/components/common/SearchForm';
import moment from 'moment';
import qs from 'qs';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

class ComponentsTicketUseQuerySearchForm extends Component {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    table: ImmutablePropTypes.list.isRequired,
    searchData: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool.isRequired,
    tableGet: PropTypes.func.isRequired,
  }
  exportList = () => {
    window.open('csrTicketUseRecord/exportList?' + qs.stringify(this.props.searchData.toJS()));
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <CommonSearchForm {...this.props} loading={this.props.loading || this.props.table.some(t => t.get('loading'))} afterBtns={
        <Button type="primary" style={{ marginLeft: 8 }} loading={this.props.loading} onClick={this.exportList}>导出列表</Button>
      }>
        <FormItem>
          {getFieldDecorator('userName')(
            <Input addonBefore={'姓名'} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('userPhone')(
            <Input addonBefore={'手机号'} />
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
        <Divider style={{ margin: '3px 0 -1px 0' }} />
        <FormItem>
          <Input addonBefore={'创建时间'} className="inputDate" addonAfter=
            {getFieldDecorator('time')(
              <RangePicker />
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
    if (formData.startTime && formData.endTime) {
      formData.time = [moment(formData.startTime), moment(formData.endTime)];
      delete formData.startTime;
      delete formData.endTime;
    }
    for (var v in formData) {
      values[v] = Form.createFormField({
        value: formData[v] === undefined ? '' : formData[v].constructor === Number ? '' + formData[v] : formData[v],
      });
    }
    return values;
  }
})(ComponentsTicketUseQuerySearchForm);
