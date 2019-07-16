import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonSearchForm from '@/components/common/SearchForm';

const FormItem = Form.Item;

class ComponentsUserManagerSearchForm extends Component {
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
          {getFieldDecorator('loginName', {
            rules: [{
              max: 20,
              message: '不能超过20个字'
            }],
          })(
            <Input addonBefore={'帐号'} placeholder={'例如：sys'} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{
              max: 20,
              message: '不能超过20个字'
            }],
          })(
            <Input addonBefore={'姓名'} placeholder={'例如：超级管理员'} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('phone', {
            rules: [{
              pattern: /^1[3-9][0-9]{9}$/,
              message: '请输入正确格式',
            }],
          })(
            <Input addonBefore={'手机号码'} type="number" />
          )}
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
})(ComponentsUserManagerSearchForm);
