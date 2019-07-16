import React, { Component } from 'react';
import { Form, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormReadContainer from '@/components/common/FormReadContainer';

const FormItem = Form.Item;

class ComponentsReservationQueryForm extends Component {
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
            <Col span={12}>
              <FormItem label={'客户姓名'} {...formItemLayout}>
                {this.props.formData.get('customerName')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'联系电话'} {...formItemLayout}>
                {this.props.formData.get('customerPhone')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'预约车型'} {...formItemLayout}>
                {this.props.formData.get('carModelName')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'预约商户'} {...formItemLayout}>
                {this.props.formData.get('merchantName')}
              </FormItem>
            </Col>
            {this.props.formData.get('type') !== 'SECOND_HAND_CAR' && this.props.formData.get('handleDesc') === '转金融' && <React.Fragment>
              <Col span={12}>
                <FormItem label={'金融方案'} {...formItemLayout}>
                  {this.props.formData.get('schemeName')}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label={'贷款金额'} {...formItemLayout}>
                  {this.props.formData.get('firstPayment')}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label={'预贷款额'} {...formItemLayout}>
                  {this.props.formData.get('loanAmount')}
                </FormItem>
              </Col>
            </React.Fragment>}
            {this.props.formData.get('type') !== 'SECOND_HAND_CAR' && this.props.formData.get('handleDesc') === '转金融' && <React.Fragment>
              <Col span={12}>
                <FormItem label={'期数'} {...formItemLayout}>
                  {this.props.formData.get('periods')}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label={'操作费率'} {...formItemLayout}>
                  {this.props.formData.get('standardRate')}
                </FormItem>
              </Col>
            </React.Fragment>}
            {this.props.formData.get('handleDesc') === '转金融' && <React.Fragment>
              <Col span={12}>
                <FormItem label={'关联订单号'} {...formItemLayout}>
                  {this.props.formData.get('orderNo')}
                </FormItem>
              </Col>
            </React.Fragment>}
            <Col span={12}>
              <FormItem label={'预约日期'} {...formItemLayout}>
                {this.props.formData.get('bespeakDate')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'所属渠道'} {...formItemLayout}>
                {this.props.formData.get('channelName')}
              </FormItem>
            </Col>
            {this.props.formData.get('status') === 'processed' && <React.Fragment>
              <Col span={12}>
                <FormItem label={'处理时间'} {...formItemLayout}>
                  {this.props.formData.get('handleTime')}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label={'处理类型'} {...formItemLayout}>
                  {this.props.formData.get('handleDesc')}
                </FormItem>
              </Col>
            </React.Fragment>}
            <Col span={12}>
              <FormItem label={'总金额'} {...formItemLayout}>
                {this.props.formData.get('totalAmount')}
              </FormItem>
            </Col>
          </Row>
          {this.props.formData.get('status') === 'processed' && this.props.formData.get('handleDesc') === '全款' && <Row>
            <Col span={24}>
              <FormItem label={'发票'} {...sigleItemLayout}>
                <img alt="发票" src={this.props.formData.get('invoicePicture')} />
              </FormItem>
            </Col>
          </Row>}
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
})(ComponentsReservationQueryForm);
