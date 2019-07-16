import React, { Component } from 'react';
import { Form, Row, Col, Select, Button, Cascader } from 'antd';
import areaDataLevel2 from '@/publicData/areaDataLevel2';
import chinaAreaCascadeValueMap from '@/publicData/chinaAreaCascadeValueMap';
import areaDataOneLevel from '@/publicData/areaDataOneLevel';

const FormItem = Form.Item;
const { Option } = Select;

class ComponentsDefaultConfigForm extends Component {
  state = {
    channelIdFlag: true,
    schemeIdFlag: true,
    belongRegionFlag: true,
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
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
    const style = {
      marginTop: 4
    };
    return (
      <React.Fragment>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={12}>
              <FormItem label={'默认渠道'} {...formItemLayout}>
                {getFieldDecorator('channelId')(
                  <Select disabled={this.state.channelIdFlag} style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                    {
                      [].concat(this.props.channelInfoList.toJS()).map(v => <Option key={v.id}>{v.name}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              {this.state.channelIdFlag && <Button style={style} type="primary" onClick={() => this.setState({ channelIdFlag: false })}>修改</Button>}
              {!this.state.channelIdFlag && <Button style={style} type="primary" onClick={() => this.props.addOrUpdateDefaultChannel({ channelId: getFieldValue('channelId') }).then(this.props.thenableGetDefaultData).then(() => this.setState({ channelIdFlag: true }))}>保存</Button>}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label={'默认金融方案'} {...formItemLayout}>
                {getFieldDecorator('schemeId')(
                  <Select disabled={this.state.schemeIdFlag} style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                    {
                      [].concat(this.props.schemeInfoList.toJS()).map(v => <Option key={v.id}>{v.schemeName}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              {this.state.schemeIdFlag && <Button style={style} type="primary" onClick={() => this.setState({ schemeIdFlag: false })}>修改</Button>}
              {!this.state.schemeIdFlag && <Button style={style} type="primary" onClick={() => this.props.addOrUpdateDefaultScheme({ schemeId: getFieldValue('schemeId') }).then(this.props.thenableGetDefaultData).then(() => this.setState({ schemeIdFlag: true }))}>保存</Button>}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label={'默认城市'} {...formItemLayout}>
                {getFieldDecorator('belongRegion')(
                  <Cascader
                    options={areaDataLevel2}
                    placeholder={''}
                    disabled={this.state.belongRegionFlag}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              {this.state.belongRegionFlag && <Button style={style} type="primary" onClick={() => this.setState({ belongRegionFlag: false })}>修改</Button>}
              {!this.state.belongRegionFlag && <Button
                style={style}
                type="primary"
                onClick={() => {
                  const belongRegion = getFieldValue('belongRegion')[getFieldValue('belongRegion').length - 1];
                  const belongRegionName = areaDataOneLevel[belongRegion];
                  this.props.addOrUpdateDefaultCity({ belongRegion, belongRegionName })
                    .then(this.props.thenableGetDefaultData)
                    .then(() => this.setState({ belongRegionFlag: true }));
                }}>保存</Button>}
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}

export default Form.create({
  mapPropsToFields(props) {
    const data = props.data.toJS();
    const values = {};
    for (var v in data) {
      values[v] = Form.createFormField({
        value: data[v] === undefined ? '' : data[v].constructor === Number ? '' + data[v] : data[v],
      });
    }
    if (data.belongRegion && (typeof data.belongRegion === 'string')) {
      values.belongRegion = Form.createFormField({
        value: chinaAreaCascadeValueMap[data.belongRegion],
      });
    }
    return values;
  }
})(ComponentsDefaultConfigForm);
