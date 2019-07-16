import React, { Component } from 'react';
import { Form, Row, Col, Input } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;

class ComponentsTab3Form extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    uploadLoading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
  }
  handleConfirmPassword(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入不一致！');
    }
    callback();
  }
  get titleFlag () {
    const [a, b] = this.props.title;
    return !([a,b].join('') === '详情');
  }
  get channelContactsList () {
    const channelContactsList = this.props.formData.get('channelContactsList');
    if (channelContactsList) {
      return channelContactsList.toJS();
    }
    return [];
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <CommonFormModal {...this.props} width={600} notFooter={!this.titleFlag}>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={12}>
              <FormItem label={'姓名'} {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '请输入姓名!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'电话'} {...formItemLayout}>
                {getFieldDecorator('phone', {
                  rules: [{
                    required: true,
                    message: '请输入电话!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'邮箱'} {...formItemLayout}>
                {getFieldDecorator('email', {
                  rules: [{
                    required: true,
                    message: '请输入邮箱!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'职务'} {...formItemLayout}>
                {getFieldDecorator('jobTitle', {
                  rules: [{
                    required: true,
                    message: '请输入职务!',
                  }],
                })(
                  <Input />
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
})(ComponentsTab3Form);
