import React, { Component } from 'react';
import { Form, Input, Row, Col, Select } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;
const { Option } = Select;

class ComponentsSCRecomBrandManagerForm extends Component {
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
              <FormItem label={'名称'} {...sigleItemLayout}>
                {getFieldDecorator('brandsId', {
                  rules: [{
                    required: true,
                    message: '请输入名称!',
                  }],
                })(
                  <Select showSearch optionFilterProp="label" style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                    {
                      [].concat(this.props.cbList.toJS()).map(v => <Option key={v.id} label={v.name}>{v.name}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label={'排序'} {...sigleItemLayout}>
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
})(ComponentsSCRecomBrandManagerForm);
