import React, { Component } from 'react';
import { Form, Input, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SingleImageUpload from '@/components/common/SingleImageUpload';
import CommonFormModal from '@/components/common/FormModal';
import { recommendedImageSizeText } from '@/util';

const FormItem = Form.Item;

class ComponentsSeriesManagerForm extends Component {
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
              <FormItem label={'封面图'} {...sigleItemLayout}>
                <SingleImageUpload
                  fileUrl="cover"
                  filePath="coverUrl"
                  nowFormData={getFieldsValue()}
                  {...this.props}
                  imgStyles={{
                    width: 120,
                    height: 80,
                  }}
                />
                {recommendedImageSizeText(120, 80)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'车系名称'} {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '请输入车系名称!',
                  }],
                })(
                  <Input placeholder={'例如：奥迪'} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'车系组名'} {...formItemLayout}>
                {getFieldDecorator('seriesGroupName', {
                  rules: [{
                    required: true,
                    message: '请输入车系组名!',
                  }],
                })(
                  <Input placeholder={'例如：一汽奥迪'} />
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
})(ComponentsSeriesManagerForm);
