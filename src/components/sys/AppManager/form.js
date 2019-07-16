import React, { Component } from 'react';
import { Form, Input, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SingleImageUpload from '@/components/common/SingleImageUpload';
import CommonFormModal from '@/components/common/FormModal';
import { project_name } from '@/publicData/config';

const FormItem = Form.Item;

class ComponentsAppManagerForm extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    uploadLoading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
    openUploadLoading: PropTypes.func.isRequired,
    closeUploadLoading: PropTypes.func.isRequired,
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
    const singleLayout = {
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
              <FormItem label={'logo'} {...singleLayout}>
                <SingleImageUpload
                  fileUrl="logo"
                  filePath="logoUrl"
                  nowFormData={getFieldsValue()}
                  {...this.props}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'名称'} {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '请输入名称!',
                  }, {
                    max: 8,
                    message: '不能超过8个字'
                  }],
                })(
                  <Input placeholder={`例如：${project_name}`} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'appCode'} {...formItemLayout}>
                {getFieldDecorator('appCode', {
                  rules: [{
                    required: true,
                    message: '请输入appCode!',
                  }, {
                    pattern: /^[a-z|A-Z]+$/,
                    message: '必须是英文!',
                  }, {
                    max: 10,
                    message: '不能超过10个字'
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label={'网址'} {...singleLayout}>
                {getFieldDecorator('url', {
                  rules: [{
                    required: true,
                    message: '请输入网址!',
                  }, {
                    pattern: /^http:\/\/[a-z|/|.]+$|^https:\/\/[a-z|/|.]+$/,
                    message: 'http://或https://开头的网址',
                  }, {
                    max: 60,
                    message: '不能超过60个字'
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
})(ComponentsAppManagerForm);
