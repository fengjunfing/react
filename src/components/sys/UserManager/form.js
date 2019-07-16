import React, { Component } from 'react';
import { Form, Input, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SingleImageUpload from '@/components/common/SingleImageUpload';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;

class ComponentsUserManagerForm extends Component {
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
                {getFieldDecorator('headPortrait', {
                  rules: [{
                    required: true,
                    message: '必须!',
                  }]
                })(
                  <SingleImageUpload
                    fileUrl="headPortrait"
                    filePath="headPortraitUrl"
                    nowFormData={getFieldsValue()}
                    {...this.props}
                  />
                )}
              </FormItem>
            </Col>
            {
              this.props.formData.get('id') ? '' :
                <Col span={12}>
                  <FormItem label={'帐号'} {...formItemLayout}>
                    {getFieldDecorator('loginName', {
                      rules: [{
                        required: true,
                        message: '请输入帐号!',
                      }, {
                        pattern: /\w/g,
                        message: '只能输入英文数字下划线'
                      }, {
                        pattern: /^[A-Z|a-z]/,
                        message: '必须英文字母开头'
                      }, {
                        max: 20,
                        message: '不能超过20个字'
                      }],
                    })(
                      <Input placeholder={'例如：sys'} />
                    )}
                  </FormItem>
                </Col>
            }
            <Col span={12}>
              <FormItem label={'姓名'} {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '请输入姓名!',
                  }, {
                    max: 8,
                    message: '不能超过8个字'
                  }],
                })(
                  <Input placeholder={'例如：超级管理员'} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'手机号码'} {...formItemLayout}>
                {getFieldDecorator('phone', {
                  rules: [{
                    required: true,
                    message: '请输入手机号码!',
                  }, {
                    pattern: /^1[3-9][0-9]{9}$/,
                    message: '请输入正确格式',
                  }],
                })(
                  <Input type="number" />
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
})(ComponentsUserManagerForm);
