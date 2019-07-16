import React, { Component } from 'react';
import { Form, Input, Row, Col, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormReadContainer from '@/components/common/FormReadContainer';

const FormItem = Form.Item;
const { TextArea } = Input;

class ComponentsMortgageFreeManagerForm extends Component {
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
      <CommonFormReadContainer {...this.props} width={800} customStyle={{ height: 'calc(100vh - 170px)', overflow: 'auto' }} showSubmitBtn >
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={12}>
              <FormItem label={'客户分类'} {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '请输入客户分类!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'分类编码'} {...formItemLayout}>
                {getFieldDecorator('type', {
                  rules: [{
                    required: true,
                    message: '请输入分类编码!',
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
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label={'所需材料说明'} {...formItemLayout}>
                {getFieldDecorator('requiredMaterialsDesc', {
                  rules: [{
                    required: true,
                    message: '请输入所需材料说明!',
                  }],
                })(
                  <TextArea rows={4} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'要求'} {...formItemLayout}>
                {getFieldDecorator('requirement', {
                  rules: [{
                    required: true,
                    message: '请输入要求!',
                  }],
                })(
                  <TextArea rows={4} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label={'所需材料列表'} {...sigleItemLayout}>
                {getFieldDecorator('requiredMaterialsList', {
                  rules: [{
                    required: true,
                    message: '请选择所需材料列表!',
                  }],
                })(
                  <Checkbox.Group>
                    {
                      [].concat(Object.entries(this.props.dictData.get('MORTGAGE_FREE_MATERIALS').toJS())).map(([dictValue, dictName]) => <Checkbox style={{ margin: '0 0 4px 6px' }} key={dictValue} value={dictValue}>{dictName}</Checkbox>)
                    }
                  </Checkbox.Group>
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
    return values;
  }
})(ComponentsMortgageFreeManagerForm);
