import React, { Component } from 'react';
import { Form, Row, Col, Input, Select } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

class Tabs5 extends Component {
  componentDidMount () {
    this.props.getChannelMerchantInfoConfig({ channelId: this.props.base.get('id') });
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
              <FormItem label={'初始化类型'} {...formItemLayout}>
                {getFieldDecorator('configType', {
                  rules: [{
                    required: true,
                    message: '请选择初始化类型!',
                  }],
                })(
                  <Select style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                    {
                      [].concat(Object.entries(this.props.dictData.get('CONFIG_TYPE').toJS())).map(t => <Option key={t[0]}>{t[1]}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'是否自动处理'} {...formItemLayout}>
                {getFieldDecorator('status', {
                  rules: [{
                    required: true,
                    message: '请选择是否自动处理!',
                  }],
                })(
                  <Select style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                    {
                      [].concat(Object.entries(this.props.dictData.get('YES_OR_NO').toJS())).map(t => <Option key={t[0]}>{t[1]}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label={'备注'} {...sigleItemLayout}>
                {getFieldDecorator('remarks', {
                  rules: [{
                    required: true,
                    message: '请输入备注!',
                  }],
                })(
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
})(Tabs5);
