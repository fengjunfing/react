import React, { Component } from 'react';
import { Form, Input, Row, Col, Select } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SingleImageUpload from '@/components/common/SingleImageUpload';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;
const { Option } = Select;

class ComponentsChannelAdminManagerForm extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    uploadLoading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
    openUploadLoading: PropTypes.func.isRequired,
    closeUploadLoading: PropTypes.func.isRequired,
  }
  handleConfirmPassword(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入不一致！');
    }
    callback();
  }
  get isAdd () {
    return this.props.title !== '新增用户';
  }
  customGetFieldDecorator = message => {
    if (!this.isAdd) {
      return {
        rules: [{
          required: true,
          message,
        }],
      };
    }
    return undefined;
  }
  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form;
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
    const sigleItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return (
      <CommonFormModal {...this.props} width={600}>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={24}>
              <FormItem label={'头像'} {...sigleItemLayout}>
                <SingleImageUpload
                  fileUrl="headPortrait"
                  filePath="headPortraitUrl"
                  nowFormData={getFieldsValue()}
                  {...this.props}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'账号'} {...formItemLayout}>
                {getFieldDecorator('loginName', this.customGetFieldDecorator('请输入账号!'))(
                  <Input disabled={this.isAdd} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'所属渠道'} {...formItemLayout}>
                {getFieldDecorator('channelId', this.customGetFieldDecorator('请输入所属渠道!'))(
                  <Select disabled={this.isAdd} style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                    {
                      this.props.channelNameList.map(t => <Option key={t.value}>{t.label}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
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
          </Row>
          {
            this.props.formData.get('id') ? '' :
              <Row>
                <Col span={12}>
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
                <Col span={12}>
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
          }
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
})(ComponentsChannelAdminManagerForm);
