import React, { Component } from 'react';
import { Form, Row, Col, Radio, Button, Input } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class ComponentsKeyGenerationForm extends Component {
  get RSA_LENGTH () {
    const signType = this.props.form.getFieldValue('signType');
    return this.props.dictData.get('RSA_LENGTH').toArray().filter((v => v !== (signType === 'RSA2' ? '1024' : '')));
  }
  handleRSAChange = () => {
    this.props.form.setFieldsValue({
      keySize: '',
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const sigleItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 36 },
        sm: { span: 22 },
      },
    };
    return (
      <React.Fragment>
        <Form style={{ margin: '8px 16px' }}>
          {/* <Row>
            <Col span={12}>
              <FormItem label={'加密类型'} {...formItemLayout}>
                {getFieldDecorator('signType', {
                  rules: [{
                    required: true,
                    message: '请选择加密类型!',
                  }],
                })(
                  <RadioGroup onChange={this.handleRSAChange} options={this.props.dictData.get('RSA').toArray()} />
                )}
              </FormItem>
            </Col>
          </Row> */}
          <Row>
            <Col span={12}>
              <FormItem label={'密钥长度'} {...formItemLayout}>
                {getFieldDecorator('keySize', {
                  rules: [{
                    required: true,
                    message: '请选择密钥长度!',
                  }],
                })(
                  <RadioGroup options={this.RSA_LENGTH} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Button key="submit" type="primary" style={{ marginBottom: '20px' }} onClick={this.props.handleSubmit} >生成密钥</Button>
          <Row>
            <Col span={24}>
              <FormItem label={'私钥'} {...sigleItemLayout}>
                {getFieldDecorator('mprivateKey')(
                  <TextArea rows={4} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label={'公钥'} {...sigleItemLayout}>
                {getFieldDecorator('mpublicKey')(
                  <TextArea rows={4} />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
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

    if (props.formBackup) {
      const keySize = props.formBackup.props.form.getFieldsValue().keySize;
      values.keySize = Form.createFormField({
        value: keySize === undefined ? '' : keySize.constructor === Number ? '' + keySize : keySize,
      });
      const signType = props.formBackup.props.form.getFieldsValue().signType;
      values.signType = Form.createFormField({
        value: signType === undefined ? '' : signType.constructor === Number ? '' + signType : signType,
      });
    }
    return values;
  }
})(ComponentsKeyGenerationForm);
