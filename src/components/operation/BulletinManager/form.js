import React, { Component } from 'react';
import { Form, Input, Row, Col, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormModal from '@/components/common/FormModal';
import moment from 'moment';

const FormItem = Form.Item;
const { TextArea } = Input;

class ComponentsBulletinManagerForm extends Component {
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
  handleDisabledDate = date => {
    const startDate = moment(moment(new Date()).format('YYYY-MM-DD'));
    if (!date || !startDate) {
      return false;
    }
    return date.isBefore(startDate);
  }
  get isLook () {
    const [t1, t2] = this.props.title;
    if (t1 + t2 === '查看') {
      return true;
    }
    return false;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
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
      <CommonFormModal {...this.props} width={600} notFooter={this.isLook}>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={24}>
              <FormItem label={'公告标题'} {...sigleItemLayout}>
                {getFieldDecorator('title', {
                  rules: [{
                    required: true,
                    message: '请输入公告标题!',
                  }],
                })(
                  <Input disabled={this.isLook} />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label={'有效日期'} {...sigleItemLayout}>
                {getFieldDecorator('effectiveDate', {
                  rules: [{
                    required: true,
                    message: '请选择有效日期!',
                  }],
                })(
                  <DatePicker disabled={this.isLook} disabledDate={this.handleDisabledDate} />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label={'公告内容'} {...sigleItemLayout}>
                {getFieldDecorator('information', {
                  rules: [{
                    required: true,
                    message: '请输入公告内容!',
                  }],
                })(
                  <TextArea disabled={this.isLook} rows={4} />
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
    if (formData.effectiveDate) {
      values.effectiveDate = Form.createFormField({
        value: moment(formData.effectiveDate)
      });
    } else {
      delete values.effectiveDate;
    }
    return values;
  }
})(ComponentsBulletinManagerForm);
