import React, { Component } from 'react';
import { Form, Row, Col, Input, Radio, Typography } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Title } = Typography;

class Tabs1 extends Component {
  componentDidMount () {
    this.props.appConfigSelectByChannelId({ channelId: this.props.base.get('id') });
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
      <React.Fragment>
        <Form style={{ margin: '8px 16px' }}>
          <Title level={4}>渠道加密信息</Title>
          <Row>
            <Col span={12}>
              <FormItem label={'应用ID'} {...formItemLayout}>
                {getFieldDecorator('appId')(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label={'渠道加密类型'} {...formItemLayout}>
                {getFieldDecorator('msignType', {
                  rules: [{
                    required: true,
                    message: '请选择渠道加密类型!',
                  }],
                })(
                  <RadioGroup options={this.props.dictData.get('RSA').toArray()} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label={'渠道加密公钥'} {...sigleItemLayout}>
                {getFieldDecorator('mpublicKey', {
                  rules: [{
                    required: true,
                    message: '请输入渠道加密公钥!',
                  }],
                })(
                  <TextArea rows={4} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label={'渠道加密私钥'} {...sigleItemLayout}>
                {getFieldDecorator('mprivateKey', {
                  rules: [{
                    required: true,
                    message: '请输入渠道加密私钥!',
                  }],
                })(
                  <TextArea rows={4} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Title level={4}>平台加密信息</Title>
          <Row>
            <Col span={12}>
              <FormItem label={'平台加密类型'} {...formItemLayout}>
                {getFieldDecorator('psignType')(
                  <RadioGroup options={this.props.dictData.get('RSA').toArray()} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label={'平台加密私钥'} {...sigleItemLayout}>
                {getFieldDecorator('pprivateKey')(
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
    return values;
  }
})(Tabs1);
