import React, { Component } from 'react';
import { Form, Input, Row, Col, TreeSelect } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;

class ComponentsDictManagerForm extends Component {
  static propTypes = {
    table: ImmutablePropTypes.list.isRequired,
    menuTree: ImmutablePropTypes.list.isRequired,
    loading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
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
    const formSingleItemLayout = {
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
      <CommonFormModal {...this.props} width={700}>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={24}>
              <FormItem label={'类型名称'} {...formSingleItemLayout}>
                {getFieldDecorator('typeName', {
                  rules: [{
                    required: true,
                    message: '请输入类型名称!',
                  }, {
                    max: 20,
                    message: '不能超过20个字'
                  }],
                })(
                  <Input placeholder={'例如：职业类型'} />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label={'类型代码'} {...formSingleItemLayout}>
                {getFieldDecorator('typeCode', {
                  rules: [{
                    required: true,
                    message: '请输入类型代码!',
                  }, {
                    max: 50,
                    message: '不能超过50个字'
                  }],
                })(
                  <Input placeholder={'例如：code'} />
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
            <Col span={12}>
              <FormItem label={'排序'} {...formItemLayout}>
                {getFieldDecorator('sort', {
                  rules: [{
                    required: true,
                    message: '请输入排序!',
                  }, {
                    max: 3,
                    message: '不能超过三位数',
                  }],
                })(
                  <Input type="number" placeholder={'例如: 31'} />
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
    return values;
  }
})(ComponentsDictManagerForm);
