import React, { Component } from 'react';
import { Form, Input, Row, Col, DatePicker, Button, Table, Divider } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormReadContainer from '@/components/common/FormReadContainer';
import moment from 'moment';

const FormItem = Form.Item;

class ComponentsFinProjectManagerForm extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    uploadLoading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
    openUploadLoading: PropTypes.func.isRequired,
    closeUploadLoading: PropTypes.func.isRequired,
  }
  handleDisabledDate = date => {
    const startDate = moment(moment(new Date()).format('YYYY-MM-DD'));
    if (!date || !startDate) {
      return false;
    }
    return date.isBefore(startDate);
  }
  get schemeDetailList () {
    const schemeDetailList = this.props.formData.get('schemeDetailList');
    if (schemeDetailList) {
      return schemeDetailList.toJS();
    }
    return [];
  }
  addDetail = () => {
    this.props.detailFormReset();
    this.props.detailFormShow({
      title: '添加方案详情',
    });
  }
  editDetail = (record, index) => {
    this.props.detailFormReset();
    this.props.detailFormShow({
      title: '修改方案详情',
      index,
    });
    this.props.detailFormSetData(record);
  }
  delDetail = index => {
    const schemeDetailList = this.props.formData.get('schemeDetailList').toJS();
    schemeDetailList.splice(index, 1);
    this.props.formSetData({
      schemeDetailList,
    });
  }
  handleChange = () => {
    setTimeout(() => {
      this.props.formSetData(this.props.form.getFieldsValue());
    }, 0);
  }
  get isDetail () {
    const [t1, t2] = this.props.title;
    return t1 + t2 === '详情';
  }
  get columns () {
    const columns = [
      {
        title: '序号',
        key: 'index',
        align: 'center',
        width: 60,
        render: (...args) => args[2] + 1,
      },
      {
        title: '期数',
        dataIndex: 'periods',
      },
      {
        title: '操作费率',
        dataIndex: 'standardRate',
        render: text => text && text + '%',
      },
    ];
    if (!this.isDetail) {
      columns.push({
        title: '操作',
        width: 180,
        render: (text, record, index) => {
          return (
            <React.Fragment>
              <a onClick={() => this.editDetail(record, index)}>编辑</a>
              <Divider type="vertical" />
              <a onClick={() => this.delDetail(index)}>删除</a>
            </React.Fragment>
          );},
      });
    }
    return columns;
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
    // const sigleItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 2 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 20 },
    //   },
    // };
    return (
      <CommonFormReadContainer  {...this.props} width={800} showSubmitBtn={!this.isDetail}>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={6}>
              <FormItem label={'名称'} {...formItemLayout}>
                {getFieldDecorator('schemeName', {
                  rules: [{
                    required: true,
                    message: '请输入名称!',
                  }],
                })(
                  <Input onChange={this.handleChange} disabled={this.isDetail} />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={'有效起始日期'} {...formItemLayout}>
                {getFieldDecorator('effectDateStart', {
                  rules: [{
                    required: true,
                    message: '请选择有效起始日期!',
                  }],
                })(
                  <DatePicker onChange={this.handleChange} disabled={this.isDetail} disabledDate={this.handleDisabledDate} />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={'有效结束日期'} {...formItemLayout}>
                {getFieldDecorator('effectDateEnd', {
                  rules: [{
                    required: true,
                    message: '请选择有效结束日期!',
                  }],
                })(
                  <DatePicker onChange={this.handleChange} disabled={this.isDetail} disabledDate={this.handleDisabledDate} />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={'首付最低占比'} {...formItemLayout}>
                {getFieldDecorator('firstPaymentRate', {
                  rules: [{
                    required: true,
                    message: '请输入首付最低占比!',
                  }],
                })(
                  <Input onChange={this.handleChange} disabled={this.isDetail} type="number" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            {!this.isDetail && <Button type="primary" style={{ marginBottom: 10 }} onClick={this.addDetail}>添加详情</Button>}
            <Col span={24}>
              <Table rowKey={(record, index) => record.id || index} dataSource={this.schemeDetailList} columns={this.columns} pagination={false} />
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
    if (formData.effectDateStart) {
      values.effectDateStart = Form.createFormField({
        value: moment(formData.effectDateStart)
      });
    } else {
      delete values.effectDateStart;
    }
    if (formData.effectDateEnd) {
      values.effectDateEnd = Form.createFormField({
        value: moment(formData.effectDateEnd)
      });
    } else {
      delete values.effectDateEnd;
    }
    return values;
  }
})(ComponentsFinProjectManagerForm);
