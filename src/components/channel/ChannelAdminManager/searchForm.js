import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonSearchForm from '@/components/common/SearchForm';

const FormItem = Form.Item;
const { Option } = Select;

class ComponentsChannelAdminManagerSearchForm extends Component {
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
          {getFieldDecorator('name', {
            rules: [{
              max: 20,
              message: '不能超过20个字'
            }],
          })(
            <Input addonBefore={'姓名'} />
          )}
        </FormItem>
        <FormItem>
          <Input addonBefore={'渠道'} className={'inputSelect'} addonAfter=
            {getFieldDecorator('channelId')(
              <Select style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                {
                  this.props.channelNameList.map(t => <Option key={t.value}>{t.label}</Option>)
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
                  [['', '所有']].concat(Object.entries(this.props.dictData.get('USE_STATUS').toJS())).map(t => <Option key={t[0]} value={t[0]}>{t[1]}</Option>)
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
    for (var v in formData) {
      values[v] = Form.createFormField({
        value: formData[v] === undefined ? '' : formData[v].constructor === Number ? '' + formData[v] : formData[v],
      });
    }
    return values;
  }
})(ComponentsChannelAdminManagerSearchForm);
