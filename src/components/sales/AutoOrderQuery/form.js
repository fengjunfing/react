import React, { Component } from 'react';
import { Form, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormReadContainer from '@/components/common/FormReadContainer';

const FormItem = Form.Item;

class ComponentsAutoOrderQueryForm extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    uploadLoading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
    openUploadLoading: PropTypes.func.isRequired,
    closeUploadLoading: PropTypes.func.isRequired,
  }
  async goRefund(refundNo) {
    const menu = this.props.menu && this.props.menu.getIn(['list', 'breadCrumb']);
    const RefundQuery = menu.map(v => v.get('path') || '').find(v => v.indexOf('RefundQuery') > -1);
    RefundQuery && this.props.history.push(RefundQuery);
    let RQ_SearchData = this.props.RQ_SearchData.toJS();
    for (const key in RQ_SearchData) {
      if (key !== 'pageSize') {
        RQ_SearchData[key] = '';
      }
    }
    RQ_SearchData = {
      ...RQ_SearchData,
      refundNo,
      currentPage: 1,
    };
    const result = await this.props.RQ_TableGet(RQ_SearchData);
    const orderNo = result.getIn(['result', 0, 'orderId']);
    const orderId = result.getIn(['result', 0, 'orderId']);
    if (!orderId) { return; }
    this.props.RQ_FormReset();
    this.props.RQ_FormShow(`查看 一 ${orderNo}`);
    this.props.RQ_FormGet({ orderId });
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
    // const orderDetailColumns = [
    //   {
    //     title: '序号',
    //     key: 'index',
    //     align: 'center',
    //     width: 60,
    //     render: (...args) => args[2] + 1,
    //   },
    //   {
    //     title: '支付用途',
    //     dataIndex: 'paymentPurpose',
    //     width: 180,
    //     render: text => this.props.dictData.get('PAYMENT_PURPOSE').get(text),
    //   },
    //   {
    //     title: '支付类型',
    //     dataIndex: 'payType',
    //     width: 180,
    //     render: text => this.props.dictData.get('PAY_TYPE').get(text),
    //   },
    //   {
    //     title: '应付金额(元)',
    //     dataIndex: 'totalAmount',
    //     width: 180,
    //   },
    //   {
    //     title: '支付金额(元)',
    //     dataIndex: 'totalPayment',
    //     width: 180,
    //   },
    //   {
    //     title: '支付状态',
    //     dataIndex: 'payStatus',
    //     width: 180,
    //     render: text => this.props.dictData.get('PAY_STATUS').get(text),
    //   },
    //   {
    //     title: '退款状态',
    //     dataIndex: 'refundStatus',
    //     width: 180,
    //     render: text => this.props.dictData.get('REFUND_STATUS').get(text),
    //   },
    //   {
    //     title: '退款金额(元)',
    //     dataIndex: 'refundFee',
    //     width: 180,
    //   },
    // ];
    return (
      <CommonFormReadContainer {...this.props} width={800} customStyle={{ height: 'calc(100vh - 170px)', overflow: 'auto' }}>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={12}>
              <FormItem label={'车型名称'} {...formItemLayout}>
                {this.props.formData.get('productName')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'订单编号'} {...formItemLayout}>
                {this.props.formData.get('orderNo')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'状态'} {...formItemLayout}>
                {this.props.dictData.get('ORDER_STATUS').get(this.props.formData.get('status'))}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'用户电话'} {...formItemLayout}>
                {this.props.formData.get('customerPhone')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'用户姓名'} {...formItemLayout}>
                {this.props.formData.get('customerName')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'渠道名称'} {...formItemLayout}>
                {this.props.formData.get('channelName')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'商户名称'} {...formItemLayout}>
                {this.props.formData.get('merchantName')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'下单时间'} {...formItemLayout}>
                {this.props.formData.get('createTime')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'总金额'} {...formItemLayout}>
                {this.props.formData.get('totalAmount')}
              </FormItem>
            </Col>
            {
              this.props.formData.get('status') !== 'processing' && <Col span={12}>
                <FormItem label={this.props.dictData.get('ORDER_STATUS').get(this.props.formData.get('status')) + '时间'} {...formItemLayout}>
                  {this.props.formData.get('finishTime')}
                </FormItem>
              </Col>
            }
            {
              this.props.formData.get('status') !== 'processing' && <Col span={12}>
                <FormItem label={'支付状态'} {...formItemLayout}>
                  {this.props.dictData.get('PAY_STATUS').get(this.props.formData.get('payStatus'))}
                </FormItem>
              </Col>
            }
            {
              this.props.formData.get('refundStatus') && <Col span={12}>
                <FormItem label={'退款状态'} {...formItemLayout}>
                  {this.props.dictData.get('REFUND_STATUS').get(this.props.formData.get('refundStatus'))}
                </FormItem>
              </Col>
            }
            {
              this.props.formData.get('refundNo') && <Col span={12}>
                <FormItem label={'退款单号'} {...formItemLayout}>
                  <a onClick={this.goRefund.bind(this, this.props.formData.get('refundNo'))}>{this.props.formData.get('refundNo')}</a>
                </FormItem>
              </Col>
            }
          </Row>
          {this.props.formData.get('type') === 'loan' && <React.Fragment>
            <Col span={12}>
              <FormItem label={'首付金额'} {...formItemLayout}>
                {this.props.formData.get('firstPayment')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'期数'} {...formItemLayout}>
                {this.props.formData.get('periods')}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'贷款金额'} {...formItemLayout}>
                {this.props.formData.get('loanAmount')}
              </FormItem>
            </Col>
          </React.Fragment>}
          {this.props.formData.get('type') === 'full' && <Row>
            <Col span={24}>
              <FormItem label={'发票'} {...sigleItemLayout}>
                <img style={{ width: '100%' }} alt="发票" src={this.props.formData.get('invoicePicture')} />
              </FormItem>
            </Col>
          </Row>}
          {/* {
            this.props.formData.get('orderDetailList') &&
            this.props.formData.get('orderDetailList').size > 0 &&
            <Table dataSource={this.props.formData.get('orderDetailList').toJS()} columns={orderDetailColumns} pagination={false} />
          } */}
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
})(ComponentsAutoOrderQueryForm);
