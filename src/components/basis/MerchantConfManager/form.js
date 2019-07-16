import React, { Component } from 'react';
import { Form, Input, Row, Col, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;
const { TextArea } = Input;

class ComponentsMerchantConfManagerForm extends Component {
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
            <Col span={12}>
              <FormItem label={'名称'} {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '请输入名称!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label={'描述'} {...sigleItemLayout}>
                {getFieldDecorator('description', {
                  rules: [{
                    required: true,
                    message: '请输入描述!',
                  }],
                })(
                  <TextArea rows={4} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label={'角色列表'} {...sigleItemLayout}>
                {getFieldDecorator('roleList', {
                  rules: [{
                    required: true,
                    message: '请选择角色列表!',
                  }],
                })(
                  <Checkbox.Group>
                    {
                      this.props.roleList.toJS().map(({ id, name }) => <Checkbox style={{ margin: '0 0 4px 6px' }} key={id} value={id}>{name}</Checkbox>)
                    }
                  </Checkbox.Group>
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
})(ComponentsMerchantConfManagerForm);
