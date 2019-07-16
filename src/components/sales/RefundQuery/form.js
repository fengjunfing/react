import React, { Component } from 'react';
import { Form, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormReadContainer from '@/components/common/FormReadContainer';

const FormItem = Form.Item;

class ComponentsRefundQueryForm extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    uploadLoading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
    openUploadLoading: PropTypes.func.isRequired,
    closeUploadLoading: PropTypes.func.isRequired,
  }
  render() {
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
      <CommonFormReadContainer {...this.props} width={800} customStyle={{ height: 'calc(100vh - 170px)', overflow: 'auto' }}>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={24}>
              <FormItem label={'退款单号'} {...sigleItemLayout}>
                {this.props.formData.get('refundNo')}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label={'客户姓名'} {...formItemLayout}>
                {this.props.formData.get('customerName')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'联系方式'} {...formItemLayout}>
                {this.props.formData.get('customerPhone')}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label={'渠道名称'} {...formItemLayout}>
                {this.props.formData.get('channelName')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'退款金额'} {...formItemLayout}>
                {this.props.formData.get('refundFee')}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label={'创建人'} {...formItemLayout}>
                {this.props.formData.get('createUser')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'创建时间'} {...formItemLayout}>
                {this.props.formData.get('createTime')}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label={'退款时间'} {...formItemLayout}>
                {this.props.formData.get('refundEndTime')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'退款原因'} {...formItemLayout}>
                {this.props.formData.get('refundReason')}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </CommonFormReadContainer>
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
})(ComponentsRefundQueryForm);
