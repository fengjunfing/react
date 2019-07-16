import React, { Component } from 'react';
import { Form, Input, Row, Col, Select } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SingleImageUpload from '@/components/common/SingleImageUpload';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;
const { Option } = Select;

class ComponentsICBCECarouselManagerForm extends Component {
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
              <FormItem label={'轮播图'} {...sigleItemLayout}>
                {getFieldDecorator('refererPicture', {
                  rules: [{
                    required: true,
                    message: '请上传轮播图!',
                  }],
                })(
                  <SingleImageUpload
                    fileUrl="refererPicture"
                    filePath="refererPictureUrl"
                    nowFormData={getFieldsValue()}
                    {...this.props}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'类型'} {...formItemLayout}>
                {getFieldDecorator('refererType', {
                  rules: [{
                    required: true,
                    message: '请选择类型!',
                  }],
                })(
                  <Select style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                    {
                      [].concat(Object.entries(this.props.dictData.get('INDEX_REFETER_TYPE').toJS())).map(t => <Option key={t[0]}>{t[1]}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'排序'} {...formItemLayout}>
                {getFieldDecorator('sort', {
                  rules: [{
                    required: true,
                    message: '请输入排序!',
                  }],
                })(
                  <Input type="number" />
                )}
              </FormItem>
            </Col>
            {this.props.formData.get('id') ? <Col span={24}>
              <FormItem label={'跳转地址URL'} {...sigleItemLayout}>
                {getFieldDecorator('targetUrl', {
                  rules: [{
                    required: true,
                    message: '请输入跳转地址URL!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
              : <Col span={24}>
                <FormItem label={'名称'} {...sigleItemLayout}>
                  {getFieldDecorator('name', {
                    rules: [{
                      required: true,
                      message: '请输入名称!',
                    }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>}
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
})(ComponentsICBCECarouselManagerForm);
