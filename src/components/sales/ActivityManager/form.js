import React, { Component } from 'react';
import { Form, Row, Col, Divider, Modal, Tabs, Card, Tooltip, Table, Switch, Tag, Input, DatePicker, Typography, Icon, Select } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SingleImageUpload from '@/components/common/SingleImageUpload';
import CommonFormReadContainer from '@/components/common/FormReadContainer';
import moment from 'moment';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { Meta } = Card;
const { TextArea } = Input;
const { Text } = Typography;
const Option = Select.Option;

class ComponentsActivityManagerForm extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    uploadLoading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
    openUploadLoading: PropTypes.func.isRequired,
    closeUploadLoading: PropTypes.func.isRequired,
  }
  state = {
    bigImg: null,
  }
  get isLook () {
    const [t1, t2] = this.props.title;
    return t1 + t2 === '查看';
  }
  handleDisabledDate = date => {
    const startDate = moment(moment(new Date()).format('YYYY-MM-DD'));
    if (!date || !startDate) {
      return false;
    }
    return date.isBefore(startDate);
  }
  handleConfirmPassword(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入不一致！');
    }
    callback();
  }
  handleMLChange = isLimit => {
    const formData = this.props.formData.toJS();
    formData.isLimit = isLimit ? 'y' : 'n';
    this.props.formSetData(formData);
  }
  render() {
    const { getFieldDecorator, getFieldsValue, getFieldValue } = this.props.form;
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
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const activityGiftColumns = [
      {
        title: '名称',
        dataIndex: 'giftName',
        key: 'giftName',
      },
      {
        title: '类型',
        dataIndex: 'ticketType',
        key: 'ticketType',
        render: text => this.props.dictData.get('TICKET_TYPE').get(text),
      },
      {
        title: '面值',
        dataIndex: 'faceValue',
        key: 'faceValue',
        render: t => t && t + '元',
      },
      {
        title: '有效天数/日期',
        dataIndex: 'effectiveType',
        key: 'effectiveType',
        render: (t, r) => t === 'DAYS' ? r.effectiveDays + '天' : moment(r.effectiveDate).format('YYYY-MM-DD'),
      },
    ];
    const activitySchemeColumns = [
      {
        title: '金融方案名称',
        dataIndex: 'schemeName',
        key: 'schemeName',
      },
    ];
    const activitySchemeExpandedColumns = [
      {
        title: '期数',
        dataIndex: 'periods',
        key: 'periods',
        render: t => t && t + '期',
      },
      {
        title: '操作费率',
        dataIndex: 'standardRate',
        key: 'standardRate',
        render: t => t && t + '%',
      },
    ];
    const activitySchemeExpandedRowRender = ({ schemeDetailList: data }) => <Table
      columns={activitySchemeExpandedColumns}
      dataSource={data}
      pagination={false}
    />;
    return (
      <CommonFormReadContainer {...this.props} showSubmitBtn={!this.isLook} width={800} customStyle={{ height: 'calc(100vh - 170px)', overflow: 'auto' }}>
        {this.isLook ? <React.Fragment>
          <Form style={{ margin: '8px 16px' }}>
            <Row>
              <Col span={6}>
                <FormItem label={'活动名称'} {...formItemLayout}>
                  {this.props.formData.get('name')}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label={'活动开始时间'} {...formItemLayout}>
                  {moment(this.props.formData.get('startTime')).format('YYYY-MM-DD')}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label={'活动结束时间'} {...formItemLayout}>
                  {moment(this.props.formData.get('endTime')).format('YYYY-MM-DD')}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label={'活动介绍'} {...sigleItemLayout} style={{ wordBreak: 'break-all' }}>
                  {this.props.formData.get('remarks')}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <FormItem label={'活动封面图'} {...formItemLayout}>
                  <img
                    onClick={() => this.setState({ bigImg: this.props.formData.get('cover') })}
                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                    alt="活动封面图"
                    src={this.props.formData.get('cover')} />
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label={'活动主图'} {...formItemLayout}>
                  <img
                    onClick={() => this.setState({ bigImg: this.props.formData.get('mainPicture') })}
                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                    alt="活动主图"
                    src={this.props.formData.get('mainPicture')} />
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label={'活动背景色'} {...formItemLayout}>
                  {getFieldDecorator('backgroundColor', {
                    rules: [
                      {
                        required: true,
                        message: '请输入活动背景色!',
                      },
                      {
                        pattern: /^#[0-9a-fA-F]{6}$/,
                        message: '参考格式：#000000',
                      },
                    ],
                  })(
                    <Input disabled addonAfter={<div style={{
                      backgroundColor: /^#[0-9a-fA-F]{6}$/.test(getFieldValue('backgroundColor')) ? getFieldValue('backgroundColor') : '#00000000',
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                    }}></div>}/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Divider />
          </Form>
          <Modal
            className="no-wrapper"
            visible={!!this.state.bigImg}
            footer={null}
            onCancel={() => this.setState({ bigImg: null })}
            closable={false}
          >
            {this.state.bigImg && <img
              style={{ maxWidth: '100%', maxHeight: '100vh' }}
              alt="大图" 
              src={this.state.bigImg} />}
          </Modal>
          <Tabs defaultActiveKey="activityCarModelList" className="tabs-padding">
            <TabPane tab="活动车型" key="activityCarModelList">
              {this.props.formData.get('activityCarModelList') &&
                this.props.formData.get('activityCarModelList').map(v => <Card
                  className="list-cards"
                  key={v.get('id')}
                  style={{ width: 240 }}
                  cover={<img alt="example" src={v.get('cover')} />}
                >
                  <Meta
                    title={<Tooltip placement="topLeft" title={v.get('name')}>{v.get('name')}</Tooltip>}
                    description={
                      <React.Fragment>
                        <p>售价：{v.get('activityPrice')} 万元</p>
                        <p>排序：{v.get('sort')}</p>
                      </React.Fragment>
                    }
                  />
                </Card>)}
            </TabPane>
            <TabPane tab="活动礼券" key="activityGiftList">
              <Table dataSource={this.props.formData.get('activityGiftList') ? this.props.formData.get('activityGiftList').toJS() : []} columns={activityGiftColumns} pagination={false} />
            </TabPane>
            <TabPane tab="合作机构" key="activityMerchantList">
              <Col span={24}>
                <FormItem label={'是否受限'} {...sigleItemLayout} style={{ wordBreak: 'break-all' }}>
                  <Switch checkedChildren="是" unCheckedChildren="否" disabled checked={
                    this.props.formData.get('activityMerchantList') &&
                    this.props.formData.get('activityMerchantList').size > 0
                  } />
                </FormItem>
              </Col>
              {
                this.props.formData.get('activityMerchantList') &&
                  this.props.formData.get('activityMerchantList').size > 0 && <Col span={24}>
                  <FormItem label={'合作机构'} {...sigleItemLayout} style={{ wordBreak: 'break-all' }}>
                    {
                      this.props.formData.get('activityMerchantList').map(v => <Tag
                        key={v.get('id')}
                        color="blue">{v.get('name')}</Tag>)
                    }
                  </FormItem>
                </Col>
              }
            </TabPane>
            <TabPane tab="金融方案" key="activitySchemeList">
              <Table expandedRowRender={activitySchemeExpandedRowRender} dataSource={this.props.formData.get('activitySchemeList') ? this.props.formData.get('activitySchemeList').toJS() : []} columns={activitySchemeColumns} pagination={false} />
            </TabPane>
          </Tabs>
        </React.Fragment> : <React.Fragment>
          <Form style={{ margin: '8px 16px' }}>
            <Row>
              <Col span={6}>
                <FormItem label={'活动名称'} {...formItemLayout}>
                  {getFieldDecorator('name', {
                    rules: [{
                      required: true,
                      message: '请输入活动名称!',
                    }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label={'活动开始时间'} {...formItemLayout}>
                  {getFieldDecorator('startTime', {
                    rules: [{
                      required: true,
                      message: '请选择活动开始时间!',
                    }],
                  })(
                    <DatePicker disabledDate={this.handleDisabledDate} />
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label={'活动结束时间'} {...formItemLayout}>
                  {getFieldDecorator('endTime', {
                    rules: [{
                      required: true,
                      message: '请选择活动结束时间!',
                    }],
                  })(
                    <DatePicker disabledDate={this.handleDisabledDate} />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <FormItem label={'活动介绍'} {...sigleItemLayout}>
                  {getFieldDecorator('remarks', {
                    rules: [{
                      required: true,
                      message: '请输入活动介绍!',
                    }],
                  })(
                    <TextArea rows={4} />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <FormItem label={'活动封面图'} {...formItemLayout}>
                  {getFieldDecorator('cover', {
                    rules: [{
                      required: true,
                      message: '请上传活动封面图!',
                    }],
                  })(
                    <SingleImageUpload
                      fileUrl="cover"
                      filePath="coverUrl"
                      nowFormData={getFieldsValue()}
                      {...this.props}
                    />
                  )}
                  <Text type="secondary">建议尺寸306*120</Text>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label={'活动主图'} {...formItemLayout}>
                  {getFieldDecorator('mainPicture', {
                    rules: [{
                      required: true,
                      message: '请上传活动主图!',
                    }],
                  })(
                    <SingleImageUpload
                      fileUrl="mainPicture"
                      filePath="mainPictureUrl"
                      nowFormData={getFieldsValue()}
                      {...this.props}
                    />
                  )}
                  <Text type="secondary">建议尺寸375*220</Text>
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label={'活动背景色'} {...formItemLayout}>
                  {getFieldDecorator('backgroundColor', {
                    rules: [
                      {
                        required: true,
                        message: '请输入活动背景色!',
                      },
                      {
                        pattern: /^#[0-9a-fA-F]{6}$/,
                        message: '参考格式：#000000',
                      },
                    ],
                  })(
                    <Input addonAfter={<div style={{
                      backgroundColor: /^#[0-9a-fA-F]{6}$/.test(getFieldValue('backgroundColor')) ? getFieldValue('backgroundColor') : '#00000000',
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                    }}></div>}/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Divider />
            <Tabs defaultActiveKey="activityCarModelList" className="tabs-padding">
              <TabPane tab="活动车型" key="activityCarModelList">
                {this.props.formData.get('activityCarModelList') &&
                  this.props.formData.get('activityCarModelList').map((v, index) => <Card
                    className="list-cards"
                    key={index}
                    style={{ width: 240 }}
                    cover={<img alt="example" src={v.get('cover')} />}
                    actions={[<Icon key={'delete'} type="delete" onClick={this.props.cmDel.bind(this, index)} />, <Icon key={'edit'} type="edit" onClick={this.props.cmEdit.bind(this, index)} />]}
                  >
                    <Meta
                      title={<Tooltip placement="topLeft" title={v.get('name')}>{v.get('name')}</Tooltip>}
                      description={
                        <React.Fragment>
                          <p>售价：{v.get('activityPrice')} 万元</p>
                          <p>排序：{v.get('sort')}</p>
                        </React.Fragment>
                      }
                    />
                  </Card>)}
                <Card
                  hoverable
                  className="list-cards add-more-cards"
                  style={{ width: 240, height: 320, textAlign: 'center' }}
                  onClick={this.props.cmAdd}
                >
                  <Text type="secondary" className="center-text">添加新的活动车型</Text>
                </Card>
              </TabPane>
              <TabPane tab="活动礼券" key="activityGiftList">
                <Row>
                  <Col span={6}>
                    <FormItem label={'参与活动礼券'} {...formItemLayout}>
                      {getFieldDecorator('activityGiftList', {
                        rules: [{
                          required: true,
                          message: '请选择参与活动礼券!',
                        }],
                      })(
                        <Select onChange={this.props.handleGLChange} mode="multiple" style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                          {
                            [].concat(this.props.ticketList.toJS()).map(v => <Option key={v.id}>{v.name}</Option>)
                          }
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Table dataSource={this.props.formData.get('activityGiftList') ? this.props.formData.get('activityGiftList').toJS() : []} columns={activityGiftColumns} pagination={false} />
              </TabPane>
              <TabPane tab="合作机构" key="activityMerchantList">
                <Col span={24}>
                  <FormItem label={'是否受限'} {...sigleItemLayout} style={{ wordBreak: 'break-all' }}>
                    {getFieldDecorator('isLimit')(
                      <Switch onChange={this.handleMLChange} checked={this.props.formData.get('isLimit') === 'y' ? true : false} />
                    )}
                  </FormItem>
                </Col>
                {this.props.formData.get('isLimit') === 'y' && <Col span={6}>
                  <FormItem label={'参与合作机构'} {...formItemLayout}>
                    {getFieldDecorator('activityMerchantList')(
                      <Select onChange={this.props.handleMLSChange} mode="multiple" style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                        {
                          [].concat(this.props.merchantInfo.toJS()).map(v => <Option key={v.id}>{v.name}</Option>)
                        }
                      </Select>
                    )}
                  </FormItem>
                </Col>}
                {/* {
                  this.props.formData.get('activityMerchantList') &&
                    this.props.formData.get('activityMerchantList').size > 0 && <Col span={24}>
                    <FormItem label={'合作机构'} {...sigleItemLayout} style={{ wordBreak: 'break-all' }}>
                      {
                        this.props.formData.get('activityMerchantList').map(v => <Tag
                          key={v.get('id')}
                          color="blue">{v.get('name')}</Tag>)
                      }
                    </FormItem>
                  </Col>
                } */}
              </TabPane>
              <TabPane tab="金融方案" key="activitySchemeList">
                <Row>
                  <Col span={6}>
                    <FormItem label={'参与金融方案'} {...formItemLayout}>
                      {getFieldDecorator('activitySchemeList', {
                        rules: [{
                          required: true,
                          message: '请选择参与金融方案!',
                        }],
                      })(
                        <Select onChange={this.props.handleSILChange} mode="multiple" style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                          {
                            [].concat(this.props.schemeInfoList.toJS()).map(v => <Option key={v.id}>{v.schemeName}</Option>)
                          }
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Table expandedRowRender={activitySchemeExpandedRowRender} dataSource={this.props.formData.get('activitySchemeList') ? this.props.formData.get('activitySchemeList').toJS() : []} columns={activitySchemeColumns} pagination={false} />
              </TabPane>
            </Tabs>
          </Form>
        </React.Fragment>}
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
    if (formData.startTime) {
      values.startTime = Form.createFormField({
        value: moment(formData.startTime)
      });
    } else {
      delete values.startTime;
    }
    if (formData.endTime) {
      values.endTime = Form.createFormField({
        value: moment(formData.endTime)
      });
    } else {
      delete values.endTime;
    }
    if (formData.activitySchemeList) {
      if (typeof formData.activitySchemeList[0] === 'object') {
        values.activitySchemeList = Form.createFormField({
          value: formData.activitySchemeList.map(v => '' + v.id),
        });
      } else if (props.schemeInfoList.size > 0) {
        values.activitySchemeList = Form.createFormField({
          value: formData.activitySchemeList.map(v => '' + v),
        });
        props.handleSILChange(formData.activitySchemeList);
      }
    } else {
      values.activitySchemeList = Form.createFormField({
        value: [],
      });
    }
    if (formData.activityGiftList) {
      if (typeof formData.activityGiftList[0] === 'object') {
        values.activityGiftList = Form.createFormField({
          value: formData.activityGiftList.map(v => '' + v.id),
        });
      } else if (props.ticketList.size > 0) {
        values.activityGiftList = Form.createFormField({
          value: formData.activityGiftList.map(v => '' + v),
        });
        props.handleGLChange(formData.activityGiftList);
      }
    } else {
      values.activityGiftList = Form.createFormField({
        value: [],
      });
    }
    if (formData.activityMerchantList) {
      if (typeof formData.activityMerchantList[0] === 'object') {
        values.activityMerchantList = Form.createFormField({
          value: formData.activityMerchantList.map(v => '' + v.id),
        });
      } else if (props.merchantInfo.size > 0) {
        values.activityMerchantList = Form.createFormField({
          value: formData.activityMerchantList.map(v => '' + v),
        });
        props.handleMLSChange(formData.activityMerchantList);
      }
    } else {
      values.activityMerchantList = Form.createFormField({
        value: [],
      });
      values.isLimit = Form.createFormField({
        value: 'n',
      });
    }
    return values;
  }
})(ComponentsActivityManagerForm);
