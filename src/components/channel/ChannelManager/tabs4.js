import React, { Component } from 'react';
import { Form, Row, Col, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

class Tabs4 extends Component {
  componentDidMount () {
    this.props.getMerchantServiceList().then(() => this.props.getChannelMerchantDefaultService({ channelId: this.props.base.get('id') }));
    
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
      <React.Fragment>
        <Form style={{ margin: '8px 16px' }} ref={this.props.getRef} >
          <Row>
            <Col span={24}>
              <FormItem label={'默认权限'} {...sigleItemLayout}>
                {getFieldDecorator('serviceIdList')(
                  <Select mode="multiple" style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                    {
                      [].concat(this.props.merchantServiceList.toJS()).map(v => <Option key={v.id}>{v.name}</Option>)
                    }
                  </Select>
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
})(Tabs4);
