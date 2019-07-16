import React, { Component } from 'react';
import { Form, Input, Row, Col, Select } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SingleImageUpload from '@/components/common/SingleImageUpload';
import CommonFormModal from '@/components/common/FormModal';
import { recommendedImageSizeText } from '@/util';

const FormItem = Form.Item;
const { Option } = Select;

class ComponentsGroupManagerForm extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    uploadLoading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
    openUploadLoading: PropTypes.func.isRequired,
    closeUploadLoading: PropTypes.func.isRequired,
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
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return (
      <CommonFormModal {...this.props} width={600}>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={12}>
              <FormItem label={'分组名称'} {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '请输入分组名称!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'排序'} {...formItemLayout}>
                {getFieldDecorator('sort', {
                  rules: [{
                    required: true,
                    message: '请输入排序!',
                  }],
                })(
                  <Input type="number" />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'状态'} {...formItemLayout}>
                {getFieldDecorator('status', {
                  rules: [{
                    required: true,
                    message: '请选择状态!',
                  }],
                })(
                  <Select style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                    {
                      [].concat(Object.entries(this.props.dictData.get('USE_STATUS').toJS())).map(t => <Option key={t[0]}>{t[1]}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'类型'} {...formItemLayout}>
                {getFieldDecorator('refererType', {
                  rules: [{
                    required: true,
                    message: '请选择类型!',
                  }],
                })(
                  <Select disabled={!!this.props.formData.get('id')} style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                    {
                      [].concat(Object.entries(this.props.dictData.get('FP_GROUP_DETAIL_TYPE').toJS())).map(t => <Option key={t[0]}>{t[1]}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'布局类型'} {...formItemLayout}>
                {getFieldDecorator('layoutType', {
                  rules: [{
                    required: true,
                    message: '请选择布局类型!',
                  }],
                })(
                  <Select style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                    {
                      [].concat(Object.entries(this.props.dictData.get('FP_GROUP_LAYOUT_TYPE').toJS())).map(t => <Option key={t[0]}>{t[1]}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'是否有背景图'} {...formItemLayout}>
                {getFieldDecorator('backgroundFlag', {
                  rules: [{
                    required: true,
                    message: '请选择是否有背景图!',
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
            {
              getFieldValue('backgroundFlag') === 'y' && <Col span={12}>
                <FormItem label={'副标题'} {...formItemLayout}>
                  {getFieldDecorator('subheading', {
                    rules: [{
                      required: true,
                      message: '请输入副标题!',
                    }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            }
            {getFieldValue('backgroundFlag') === 'y' && <Col span={12}>
              <FormItem label={'背景色'} {...formItemLayout}>
                {getFieldDecorator('backgroundColor', {
                  rules: [
                    {
                      required: true,
                      message: '请输入背景色!',
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
            </Col>}
            {getFieldValue('backgroundFlag') === 'y' && <Col span={24}>
              <FormItem label={'背景图片'} {...sigleItemLayout}>
                {getFieldDecorator('refererPicture', {
                  rules: [{
                    required: true,
                    message: '请上传背景图片!',
                  }],
                })(
                  <SingleImageUpload
                    fileUrl="refererPicture"
                    filePath="refererPictureUrl"
                    nowFormData={getFieldsValue()}
                    {...this.props}
                  />
                )}
                {recommendedImageSizeText(375, 168)}
              </FormItem>
            </Col>}
          </Row>
        </Form>
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
})(ComponentsGroupManagerForm);
