import React, { Component } from 'react';
import { Form, Input, Row, Col } from 'antd';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;

class ComponentsFinProjectManagerForm extends Component {
  static propTypes = {
    formData: ImmutablePropTypes.map.isRequired,
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
    return (
      <CommonFormModal {...this.props} width={600} loading={false}>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={12}>
              <FormItem label={'期数'} {...formItemLayout}>
                {getFieldDecorator('periods', {
                  rules: [{
                    required: true,
                    message: '请输入期数!',
                  }],
                })(
                  <Input type="number" />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'操作费率'} {...formItemLayout}>
                {getFieldDecorator('standardRate', {
                  rules: [{
                    required: true,
                    message: '请输入操作费率!',
                  }],
                })(
                  <Input type="number" addonAfter="%" />
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
    const formData = props.detailFormData.toJS();
    const values = {};
    for (var v in formData) {
      values[v] = Form.createFormField({
        value: formData[v] === undefined ? '' : formData[v].constructor === Number ? '' + formData[v] : formData[v],
      });
    }
    return values;
  }
})(ComponentsFinProjectManagerForm);
