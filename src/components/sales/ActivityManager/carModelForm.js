import React, { Component } from 'react';
import { Form, Input, Row, Col, Cascader } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SingleImageUpload from '@/components/common/SingleImageUpload';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;

class ComponentsActivityManagerForm extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    uploadLoading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
    openUploadLoading: PropTypes.func.isRequired,
    closeUploadLoading: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.props.carBrandsList();
  }
  handleConfirmPassword(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入不一致！');
    }
    callback();
  }
  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const { __type, value } = targetOption;
    if (__type === 'Brands') {
      this.props.carSeriesList({
        brandId: value,
      });
    } else if (__type === 'Series') {
      const BrandsTargetOption = selectedOptions[selectedOptions.length - 2];
      this.props.carModelList({
        seriesId: value,
        brandId: BrandsTargetOption.value,
      });
    }
  }
  handleChange = () => {
    setTimeout(() => {
      this.props.formSetData(this.props.form.getFieldsValue());
    }, 0);
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
              <FormItem label={'图片'} {...sigleItemLayout}>
                {getFieldDecorator('cover', {
                  rules: [{
                    required: true,
                    message: '请上传图片!',
                  }],
                })(
                  <SingleImageUpload
                    fileUrl="cover"
                    filePath="coverUrl"
                    nowFormData={getFieldsValue()}
                    {...this.props}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label={'名称'} {...sigleItemLayout}>
                {getFieldDecorator('carModelId', {
                  rules: [{
                    required: true,
                    message: '请选择名称!',
                  }],
                })(
                  <Cascader
                    options={this.props.carList.toJS()}
                    loadData={this.loadData}
                    placeholder={this.props.formData.get('name') || ''}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'售价'} {...formItemLayout}>
                {getFieldDecorator('activityPrice', {
                  rules: [{
                    required: true,
                    message: '请输入售价!',
                  }],
                })(
                  <Input type="number" addonAfter="万元" onChange={this.handleChange} />
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
                  <Input type="number" onChange={this.handleChange} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'标签'} {...formItemLayout}>
                {getFieldDecorator('labelName', {
                  rules: [{
                    required: true,
                    message: '请输入标签!',
                  }],
                })(
                  <Input onChange={this.handleChange} />
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
    if (!Array.isArray(formData.carModelId)) {
      values.carModelId = Form.createFormField({
        value: [],
      });
    }
    return values;
  }
})(ComponentsActivityManagerForm);
