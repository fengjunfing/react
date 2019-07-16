import React, { Component } from 'react';
import { Form, Input, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SingleImageUpload from '@/components/common/SingleImageUpload';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;

class ComponentsHomeActivityManagerForm extends Component {
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
              <FormItem label={'配置名称'} {...sigleItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '请输入配置名称!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label={'Banner图'} {...sigleItemLayout}>
                {getFieldDecorator('cover', {
                  rules: [{
                    required: true,
                    message: '请上传Banner图!',
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
              <FormItem label={'背景图'} {...sigleItemLayout}>
                {getFieldDecorator('backgroundPicture', {
                  rules: [{
                    required: true,
                    message: '请上传背景图!',
                  }],
                })(
                  <SingleImageUpload
                    fileUrl="backgroundPicture"
                    filePath="backgroundPictureUrl"
                    nowFormData={getFieldsValue()}
                    {...this.props}
                  />
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
})(ComponentsHomeActivityManagerForm);
