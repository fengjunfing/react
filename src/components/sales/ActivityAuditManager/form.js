import React, { Component } from 'react';
import { Form, Row, Col, Divider, Modal, Tabs, Card, Tooltip, Table, Switch, Tag, Button, Input, message } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormReadContainer from '@/components/common/FormReadContainer';
import moment from 'moment';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { Meta } = Card;
const confirm = Modal.confirm;
const { TextArea } = Input;

class ComponentsActivityAuditManagerForm extends Component {
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
  get isCheck () {
    const [t1, t2] = this.props.title;
    return t1 + t2 === '审核';
  }
  auditPassByPrimaryKey = () => {
    this.props.auditPassByPrimaryKey({
      id: this.props.formData.get('id'),
    }).then(() => {
      const searchData = this.props.searchData.toJS();
      searchData.currentPage = this.props.formData.get('id') ? searchData.currentPage : 1;
      this.props.tableGet(searchData);
      this.props.hide();
    });
  }
  auditRejectByPrimaryKey = () => {
    let rejectReason = null;
    confirm({
      title: '驳回原因',
      content: <TextArea onChange={event => (rejectReason = event.target.value)} rows={4} />,
      onOk: () => {
        return new Promise((resolve, reject) => {
          if (!rejectReason) {
            message.warning('审核不通过原因不能为空');
            reject();
          }
          resolve();
        }).then(() => this.props.auditRejectByPrimaryKey({
          id: this.props.formData.get('id'),
          rejectReason,
        }).then(() => {
          const searchData = this.props.searchData.toJS();
          searchData.currentPage = this.props.formData.get('id') ? searchData.currentPage : 1;
          this.props.tableGet(searchData);
          this.props.hide();
        }));
      },
      onCancel() { },
    });
  }
  get customBtns () {
    return (<React.Fragment>
      <Button onClick={this.auditPassByPrimaryKey} type="primary" loading={this.props.loading} style={{ marginRight: 6 }} >通过</Button>
      <Button onClick={this.auditRejectByPrimaryKey} type="danger" loading={this.props.loading} style={{ marginRight: 6 }} >驳回</Button>
    </React.Fragment>);
  }
  handleConfirmPassword(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入不一致！');
    }
    callback();
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
      <CommonFormReadContainer {...this.props} customBtns={this.isCheck && this.customBtns} width={800} customStyle={{ height: 'calc(100vh - 170px)', overflow: 'auto' }}>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={6}>
              <FormItem label={'活动名称'} {...formItemLayout}>
                {this.props.formData.get('name')}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem label={'所属渠道'} {...formItemLayout}>
                {this.props.formData.get('channelName')}
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
              <FormItem label={'活动背景图'} {...formItemLayout}>
                <img
                  onClick={() => this.setState({ bigImg: this.props.formData.get('backgroundPicture') })}
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                  alt="活动背景图"
                  src={this.props.formData.get('backgroundPicture')} />
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
})(ComponentsActivityAuditManagerForm);
