import React, { Component } from 'react';
import { Form, Input, Row, Col, Cascader } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SingleImageUpload from '@/components/common/SingleImageUpload';
import CommonFormModal from '@/components/common/FormModal';
import { areaDataLevel2BaseChina as areaDataLevel2 } from '@/publicData/areaDataLevel2';
import { chinaAreaCascadeValueMapBaseChina as chinaAreaCascadeValueMap } from '@/publicData/chinaAreaCascadeValueMap';

const FormItem = Form.Item;

class ComponentsICBCEExclusiveSerForm extends Component {
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
              <FormItem label={'图片'} {...sigleItemLayout}>
                {getFieldDecorator('refererPicture', {
                  rules: [{
                    required: true,
                    message: '请上传图片!',
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
            <Col span={12}>
              <FormItem label={'标签'} {...formItemLayout}>
                {getFieldDecorator('labelName', {
                  rules: [{
                    required: true,
                    message: '请输入标签!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'所属区域'} {...formItemLayout}>
                {getFieldDecorator('belongRegion', {
                  rules: [{
                    required: true,
                    message: '请选择所属区域!',
                  }],
                })(
                  <Cascader options={areaDataLevel2} changeOnSelect placeholder={''} />
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
            <Col span={24}>
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
    if (formData.belongRegion && (typeof formData.belongRegion === 'string')) {
      values.belongRegion = Form.createFormField({
        value: chinaAreaCascadeValueMap[formData.belongRegion],
      });
    }
    return values;
  }
})(ComponentsICBCEExclusiveSerForm);
