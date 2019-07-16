import React, { Component } from 'react';
import { Form, Input, Row, Col, Cascader, TreeSelect } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
// import CommonFormReadContainer from '@/components/common/FormReadContainer';
import CommonFormModal from '@/components/common/FormModal';
import areaData from '@/publicData/areaData';
import chinaAreaCascadeValueMap from '@/publicData/chinaAreaCascadeValueMap';

const FormItem = Form.Item;

class ComponentsBankManagerForm extends Component {
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
    //     sm: { span: 4 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 20 },
    //   },
    // };
    return (
      // <CommonFormReadContainer {...this.props} width={800} customStyle={{ height: 'calc(100vh - 170px)', overflow: 'auto' }} showSubmitBtn >
      <CommonFormModal {...this.props} width={600}>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={12}>
              <FormItem label={'全称'} {...formItemLayout}>
                {getFieldDecorator('fullName', {
                  rules: [{
                    required: true,
                    message: '请输入全称!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'简称'} {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '请输入简称!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'联系人姓名'} {...formItemLayout}>
                {getFieldDecorator('contactsName', {
                  rules: [{
                    required: true,
                    message: '请输入联系人姓名!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'联系人手机'} {...formItemLayout}>
                {getFieldDecorator('contactsPhone', {
                  rules: [{
                    required: true,
                    message: '请输入联系人手机!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'所属区域'} {...formItemLayout}>
                {getFieldDecorator('belongRegion', {
                  rules: [{
                    required: true,
                    message: '请选择所属区域!',
                  }],
                })(
                  <Cascader options={areaData} changeOnSelect placeholder={''} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'网点编号'} {...formItemLayout}>
                {getFieldDecorator('netCode', {
                  rules: [{
                    required: true,
                    message: '请输入网点编号!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'父节点'} {...formItemLayout}>
                {getFieldDecorator('parentId', {
                  rules: [{
                    required: true,
                    message: '请选择父节点!',
                  }],
                })(
                  <TreeSelect
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={this.props.menuTree.toJS()}
                  />
                )}
              </FormItem>
            </Col>
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
    if (formData.belongRegion && (typeof formData.belongRegion === 'string')) {
      values.belongRegion = Form.createFormField({
        value: chinaAreaCascadeValueMap[formData.belongRegion],
      });
    }
    return values;
  }
})(ComponentsBankManagerForm);
