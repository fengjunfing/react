import React, { Component } from 'react';
import { Form, Row, Col, Input } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;

class ComponentsUserManagerPasswordForm extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
  }
  handleConfirmPassword(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入不一致！');
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <CommonFormModal {...this.props} width={400}>
        <Form style={{ margin: '8px 16px' }}>
          <Row gutter={24}>
            <Col span={24}>
              <FormItem label={'密码'} {...formItemLayout}>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    message: '请输入密码!',
                  }, {
                    max: 20,
                    message: '不能超过20个字'
                  }],
                })(
                  <Input type="password" />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label={'确认密码'} {...formItemLayout}>
                {getFieldDecorator('confirmPassword', {
                  rules: [{
                    required: true,
                    message: '请再次输入以确认新密码!',
                  }, {
                    validator: this.handleConfirmPassword.bind(this),
                  }],
                })(
                  <Input type="password" />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </CommonFormModal>
    );
  }
}

export default Form.create({
  mapPropsToFields(props) {
    const formData = props.formData.toJS();
    const values = {};
    for (var v in formData) {
      values[v] = Form.createFormField({
        value: formData[v] === undefined ? '' : formData[v].constructor === Number ? '' + formData[v] : formData[v],
      });
    }
    return values;
  }
})(ComponentsUserManagerPasswordForm);
