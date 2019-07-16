import React, { Component } from 'react';
import { Form, Input, Row, Col, Select, Cascader } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SingleImageUpload from '@/components/common/SingleImageUpload';
import CommonFormReadContainer from '@/components/common/FormReadContainer';

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
  constructor(props) {
    super(props);
    this.props.carBrandsList();
    // this.props.activityList();
  }
  handleConfirmPassword(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入不一致！');
    }
    callback();
  }
  get group () {
    return this.props.leftsTable.find(v => v.get('id') == this.props.searchData.get('groupId'));
  }
  get groupName () {
    if (this.group) {
      return this.group.get('name');
    }
    return '';
  }
  get groupType () {
    if (this.group) {
      return this.group.get('refererType');
    }
    return '';
  }
  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const { __type, value } = targetOption;
    if (__type === 'Brands') {
      this.props.carSeriesList({
        brandId: value,
      });
    } else if (__type === 'Series') {
      const BrandsTargetOption = selectedOptions[selectedOptions.length - 2];
      this.props.carModelList({
        seriesId: value,
        brandId: BrandsTargetOption.value,
      });
    }
  }
  handleChange = () => {
    setTimeout(() => {
      this.props.formSetData(this.props.form.getFieldsValue());
    }, 0);
  }
  handleSearch = name => {
    this.props.activityList({
      name,
    });
  }
  handleRefererNoCarModelChange = (v,v2 = []) => {
    if (v2.length !== 3) { return; }
    const { guidePrice: salePrice, firstPayment, monthlyPayment, cover } = v2[(v2.length - 1) || 0];
    const { refererPicture } = this.props.form.getFieldsValue() || {};
    setTimeout(() => {
      this.props.formSetData({
        ...this.props.form.getFieldsValue(),
        salePrice,
        firstPayment,
        monthlyPayment,
      });
      if (!refererPicture && cover) {
        this.props.formSetData({
          refererPicture: cover,
        });
      }
    }, 0);
  }
  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form;
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
      <CommonFormReadContainer {...this.props} showSubmitBtn customDividerStyle={{ margin: '13px 0 12px 0' }} width={800} customStyle={{ height: 'calc(100vh - 170px)', overflow: 'auto' }}>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={12}>
              <FormItem label={'分组名称'} {...formItemLayout}>
                <Input disabled value={this.groupName} />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'类型'} {...formItemLayout}>
                <Input disabled value={this.props.dictData.get('FP_GROUP_DETAIL_TYPE').get(this.groupType)} />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label={'图片'} {...sigleItemLayout}>
                {getFieldDecorator('refererPicture', {
                  rules: [{
                    required: true,
                    message: '请上传图片!',
                  }],
                })(
                  <SingleImageUpload
                    fileUrl="refererPicture"
                    filePath="refererPictureUrl"
                    nowFormData={getFieldsValue()}
                    {...this.props}
                  />
                )}
              </FormItem>
            </Col>
            {(this.groupType === 'CARMODEL') && <Col span={12}>
              <FormItem label={'名称'} {...formItemLayout}>
                {getFieldDecorator('refererNo', {
                  rules: [{
                    required: true,
                    message: '请选择名称!',
                  }],
                })(
                  <Cascader
                    options={this.props.carList.toJS()}
                    loadData={this.loadData}
                    placeholder=""
                    onChange={this.handleRefererNoCarModelChange}
                    popupClassName="hide-disabled"
                  />
                )}
              </FormItem>
            </Col>}
            {(this.groupType === 'WAP') && <Col span={12}>
              <FormItem label={'名称'} {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '请输入名称!',
                  }],
                })(
                  <Input onChange={this.handleChange} />
                )}
              </FormItem>
            </Col>}
            {(this.groupType === 'ACTIVITE') && <Col span={12}>
              <FormItem label={'名称'} {...formItemLayout}>
                {getFieldDecorator('refererNo', {
                  rules: [{
                    required: true,
                    message: '请选择名称!',
                  }],
                })(
                  <Select filterOption={false} showSearch onSearch={this.handleSearch} onChange={this.handleChange} style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                    {
                      [].concat(this.props.acList.toJS()).map(v => <Option key={v.id}>{v.name}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
            </Col>}
            {(this.groupType === 'MAINTAIN' ||
              this.groupType === 'SECOND_HAND_CAR') && <Col span={12}>
              <FormItem label={'名称'} {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '请选择名称!',
                  }],
                })(
                  <Input readOnly onClick={() => {
                    this.props.nameFormSetType(this.groupType);
                    this.props.nameFormReset();
                    this.props.nameFormShow('选择名称');
                  }} onChange={this.handleChange} />
                )}
              </FormItem>
            </Col>}
            {(this.groupType === 'MAINTAIN' || this.groupType === 'SECOND_HAND_CAR') && <Col span={12}>
              <FormItem label={'简介'} {...formItemLayout}>
                {getFieldDecorator('subheading')(
                  <Input disabled onChange={this.handleChange} />
                )}
              </FormItem>
            </Col>}
            {(this.groupType === 'WAP') && <Col span={12}>
              <FormItem label={'外链地址'} {...formItemLayout}>
                {getFieldDecorator('targetUrl', {
                  rules: [{
                    required: true,
                    message: '请输入外链地址!',
                  }],
                })(
                  <Input onChange={this.handleChange} />
                )}
              </FormItem>
            </Col>}
            {(this.groupType === 'CARMODEL') && <Col span={12}>
              <FormItem label={'首付'} {...formItemLayout}>
                {getFieldDecorator('firstPayment', {
                  rules: [{
                    required: true,
                    message: '请输入首付!',
                  }],
                })(
                  <Input disabled onChange={this.handleChange} />
                )}
              </FormItem>
            </Col>}
            {(this.groupType === 'CARMODEL') && <Col span={12}>
              <FormItem label={'月供'} {...formItemLayout}>
                {getFieldDecorator('monthlyPayment', {
                  rules: [{
                    required: true,
                    message: '请输入月供!',
                  }],
                })(
                  <Input disabled onChange={this.handleChange} />
                )}
              </FormItem>
            </Col>}
            {(this.groupType === 'MAINTAIN' ||
              this.groupType === 'SECOND_HAND_CAR' ||
              this.groupType === 'CARMODEL') && <Col span={12}>
              <FormItem label={this.groupType === 'CARMODEL' ? '新车价格' : '销售价格'} {...formItemLayout}>
                {getFieldDecorator('salePrice', {
                  rules: [{
                    required: true,
                    message: `请输入${this.groupType === 'CARMODEL' ? '新车价格' : '销售价格'}!`,
                  }],
                })(
                  <Input disabled onChange={this.handleChange} />
                )}
              </FormItem>
            </Col>}
            {(this.groupType === 'MAINTAIN') && <Col span={12}>
              <FormItem label={'原始价格'} {...formItemLayout}>
                {getFieldDecorator('originalPrice', {
                  rules: [{
                    required: true,
                    message: '请输入原始价格!',
                  }],
                })(
                  <Input disabled onChange={this.handleChange} />
                )}
              </FormItem>
            </Col>}
            <Col span={12}>
              <FormItem label={'排序'} {...formItemLayout}>
                {getFieldDecorator('sort', {
                  rules: [{
                    required: true,
                    message: '请输入排序!',
                  }],
                })(
                  <Input type="number" onChange={this.handleChange} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'标签'} {...formItemLayout}>
                {getFieldDecorator('labelName')(
                  <Input onChange={this.handleChange} />
                )}
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
    if (formData.refererType === 'CARMODEL' && !Array.isArray(formData.refererNo)) {
      values.refererNo = Form.createFormField({
        value: typeof formData.refererNo === 'string' ? [formData.refererNo] : [],
      });
    }
    const group = props.leftsTable.find(v => v.get('id') == props.searchData.get('groupId'));
    if ((group && group.get('type')) === 'ACTIVITE') {
      values.refererType = Form.createFormField({
        value: 'ACTIVITE',
      });
    }
    return values;
  }
})(ComponentsGroupManagerForm);
