import React, { Component } from 'react';
import { Form, Row, Col, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class Tabs2 extends Component {
  componentDidMount () {
    this.props.meltingEBoughtConfigSelectByChannelId({ channelId: this.props.base.get('id') });
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
        <Form style={{ margin: '8px 16px' }} ref={this.props.getRef} >
          <Row>
            <Col span={12}>
              <FormItem label={'APPID'} {...formItemLayout}>
                {getFieldDecorator('eappId', {
                  rules: [{
                    required: true,
                    message: '请输入APPID!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label={'融e购用户私钥'} {...sigleItemLayout}>
                {getFieldDecorator('mprivateKey', {
                  rules: [{
                    required: true,
                    message: '请输入融e购用户私钥!',
                  }],
                })(
                  <TextArea rows={4} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label={'融e购公钥'} {...sigleItemLayout}>
                {getFieldDecorator('eapigwPublicKey', {
                  rules: [{
                    required: true,
                    message: '请输入融e购公钥!',
                  }],
                })(
                  <TextArea rows={4} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label={'渠道ID'} {...formItemLayout}>
                {getFieldDecorator('emerchantId', {
                  rules: [{
                    required: true,
                    message: '请输入渠道ID!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'渠道名称'} {...formItemLayout}>
                {getFieldDecorator('emerchantName', {
                  rules: [{
                    required: true,
                    message: '请输入渠道名称!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'店铺ID'} {...formItemLayout}>
                {getFieldDecorator('eshopId', {
                  rules: [{
                    required: true,
                    message: '请输入店铺ID!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'店铺名称'} {...formItemLayout}>
                {getFieldDecorator('eshopName', {
                  rules: [{
                    required: true,
                    message: '请输入店铺名称!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'商品ID'} {...formItemLayout}>
                {getFieldDecorator('eproductId', {
                  rules: [{
                    required: true,
                    message: '请输入商品ID!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'商品名称'} {...formItemLayout}>
                {getFieldDecorator('eproductName', {
                  rules: [{
                    required: true,
                    message: '请输入商品名称!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'SKU ID'} {...formItemLayout}>
                {getFieldDecorator('eskuId', {
                  rules: [{
                    required: true,
                    message: '请输入SKU ID!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'SKU 名称'} {...formItemLayout}>
                {getFieldDecorator('eskuName', {
                  rules: [{
                    required: true,
                    message: '请输入SKU 名称!',
                  }],
                })(
                  <Input />
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
})(Tabs2);
