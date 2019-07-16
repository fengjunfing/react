import React, { Component } from 'react';
import { Form, Input, Row, Col, Select, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SingleImageUpload from '@/components/common/SingleImageUpload';
import CommonFormModal from '@/components/common/FormModal';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

class ComponentsTicketUseQueryForm extends Component {
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
    const { getFieldDecorator, getFieldsValue, getFieldValue } = this.props.form;
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
              <FormItem label={'卡券类型'} {...formItemLayout}>
                {getFieldDecorator('ticketType', {
                  rules: [{
                    required: true,
                    message: '请选择卡券类型!',
                  }],
                })(
                  <Select style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                    {
                      [].concat(Object.entries(this.props.dictData.get('TICKET_TYPE').toJS())).map(t => <Option key={t[0]}>{t[1]}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'总数量'} {...formItemLayout}>
                {getFieldDecorator('quantity', {
                  rules: [{
                    required: true,
                    message: '请输入总数量!',
                  }],
                })(
                  <Input addonAfter="张" />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'面值'} {...formItemLayout}>
                {getFieldDecorator('faceValue', {
                  rules: [{
                    required: true,
                    message: '请输入面值!',
                  }],
                })(
                  <Input addonAfter="元" />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'结算金额'} {...formItemLayout}>
                {getFieldDecorator('settlementValue', {
                  rules: [{
                    required: true,
                    message: '请输入结算金额!',
                  }],
                })(
                  <Input addonAfter="元" />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'有效期类型'} {...formItemLayout}>
                {getFieldDecorator('effectiveType', {
                  rules: [{
                    required: true,
                    message: '请选择有效期类型!',
                  }],
                })(
                  <Select disabled={this.props.formData.get('id')} style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                    {
                      [].concat(Object.entries(this.props.dictData.get('TICKET_EFFECTIVE_TYPE').toJS())).map(t => <Option key={t[0]}>{t[1]}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            {getFieldValue('effectiveType') === 'DAYS' && <Col span={12}>
              <FormItem label={'有效期'} {...formItemLayout}>
                {getFieldDecorator('effectiveDays', {
                  rules: [{
                    required: true,
                    message: '请输入有效期!',
                  }],
                })(
                  <Input addonAfter="天" type="number" />
                )}
              </FormItem>
            </Col>}
            {getFieldValue('effectiveType') === 'DATE' && <Col span={12}>
              <FormItem label={'有效期'} {...formItemLayout}>
                {getFieldDecorator('effectiveDate', {
                  rules: [{
                    required: true,
                    message: '请选择有效期!',
                  }],
                })(
                  <DatePicker />
                )}
              </FormItem>
            </Col>}
            <Col span={24}>
              <FormItem label={'备注'} {...sigleItemLayout}>
                {getFieldDecorator('remarks')(
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
    if (formData.effectiveDate) {
      values.effectiveDate = Form.createFormField({
        value: moment(formData.effectiveDate)
      });
    } else {
      delete values.effectiveDate;
    }
    return values;
  }
})(ComponentsTicketUseQueryForm);
