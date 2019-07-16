import React, { Component } from 'react';
import { Form, Row, Col, Table, Input } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SingleImageUpload from '@/components/common/SingleImageUpload';
import CommonFormModal from '@/components/common/FormModal';
import style from './style.module.css';

const FormItem = Form.Item;

class ComponentsChannelManagerForm extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    uploadLoading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
    openUploadLoading: PropTypes.func.isRequired,
    closeUploadLoading: PropTypes.func.isRequired,
  }
  handleConfirmPassword(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入不一致！');
    }
    callback();
  }
  get titleFlag () {
    const [a, b] = this.props.title;
    return !([a,b].join('') === '详情');
  }
  get channelContactsList () {
    const channelContactsList = this.props.formData.get('channelContactsList');
    if (channelContactsList) {
      return channelContactsList.toJS();
    }
    return [];
  }
  render() {
    const { getFieldsValue } = this.props.form;
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
    const readForm = [
      [['渠道编号', 'channelNo'], ['渠道名称', 'name']],
      [['负责人', 'contactsName'], ['联系电话', 'contactsPhone']],
      [['地址', 'address']],
      [['描述', 'description']],
    ];
    const columns = [{
      title: '联系人姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    }];
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
    return (
      <CommonFormModal {...this.props} width={600} notFooter={!this.titleFlag}>
        {this.titleFlag && <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={12}>
              <FormItem label={'渠道编号'} {...formItemLayout}>
                {getFieldDecorator('channelNo', {
                  rules: [{
                    required: true,
                    message: '请输入渠道编号!',
                  }],
                })(
                  <Input disabled />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'渠道名称'} {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '请输入渠道名称!',
                  }],
                })(
                  <Input disabled />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'负责人'} {...formItemLayout}>
                {getFieldDecorator('contactsName', {
                  rules: [{
                    required: true,
                    message: '请输入负责人!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'电话'} {...formItemLayout}>
                {getFieldDecorator('contactsPhone', {
                  rules: [{
                    required: true,
                    message: '请输入电话!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'地址'} {...formItemLayout}>
                {getFieldDecorator('address', {
                  rules: [{
                    required: true,
                    message: '请输入地址!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'描述'} {...formItemLayout}>
                {getFieldDecorator('description')(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'工商注册号'} {...formItemLayout}>
                {getFieldDecorator('businessRegistrationNo')(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>}
        {!this.titleFlag && <div className={style.basicInfo}>
          <div className={style.basicForm}>
            {
              readForm.map((v,i) => (
                <Row key={i}>
                  {
                    v.map(([name, value],j) => (
                      <Col key={j} span={v.length === 2 ? 12 : v.length === 3 ? 8 : 24}>
                        <div className={style.singleInfo}>
                          <span className={style.title}>{name}：</span>
                          <span className={style.content}>
                            {
                              this.props.formData.get(value)
                            }
                          </span>
                        </div>
                      </Col>)
                    )
                  }
                </Row>)
              )
            }
          </div>
        </div>}
        {!this.titleFlag && <Table rowKey={'id'} dataSource={this.channelContactsList} columns={columns} pagination={false} />}
        {this.titleFlag && <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col className="form-inline">
              <FormItem label="上传营业执照照片" {...sigleItemLayout}>
                <SingleImageUpload
                  fileUrl="businessLicenseImage"
                  filePath="businessLicenseImageUrl"
                  nowFormData={getFieldsValue()}
                  {...this.props}
                />
              </FormItem>
            </Col>
          </Row>
        </Form>}
      </CommonFormModal>
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
})(ComponentsChannelManagerForm);
