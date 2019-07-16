import React, { Component } from 'react';
import { Form, Input, Row, Col, Select, TreeSelect } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;
const Option = Select.Option;

class ComponentsMenuManagerForm extends Component {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    menuTree: ImmutablePropTypes.list.isRequired,
    loading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    };
    return (
      <CommonFormModal {...this.props} width={700}>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={12}>
              <FormItem label={'名称'} {...formItemLayout}>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '请输入名称!',
                  }, {
                    max: 8,
                    message: '不能超过8个字'
                  }],
                })(
                  <Input placeholder={'例如：菜单管理'} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'URL'} {...formItemLayout}>
                {getFieldDecorator('menuUrl', {
                  rules: [{
                    required: true,
                    message: '请输入Url!',
                  }, {
                    pattern: this.props.form.getFieldValue('menuType') === 'leaf' ? /^[A-Z][a-z|A-Z]+$/ : /^[a-z][a-z|A-Z]+$/,
                    message: this.props.form.getFieldValue('menuType') === 'leaf' ? '必须是英文！首字母大写' : '必须是英文！首字母小写',
                  }, {
                    max: 20,
                    message: '不能超过20个字'
                  }],
                })(
                  <Input placeholder={'叶子:Menu,非叶子:menu'} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <a href={'https://ant.design/components/icon-cn/'} target={'_blank'} style={{ position: 'absolute', zIndex: 1, }}>浏览</a>
              <FormItem label={'图标'} {...formItemLayout}>
                {getFieldDecorator('icon', {
                  rules: [{
                    pattern: /^[a-z|-]+$/,
                    message: '必须是英文或-!',
                  }, {
                    max: 20,
                    message: '不能超过20个字'
                  }],
                })(
                  <Input placeholder={'例如：appstore'} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label={'是否叶子'} {...formItemLayout}>
                {getFieldDecorator('menuType', {
                  rules: [{
                    required: true,
                    message: '请选择是否叶子!',
                  }],
                })(
                  <Select onChange={() => setTimeout(() => this.props.form.validateFields(['menuUrl'], { force: true }), 0)}>
                    <Option value="leaf">是</Option>
                    <Option value="folder">否</Option>
                  </Select>
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
                    max: 2,
                    message: '不能超过两位数',
                  }],
                })(
                  <Input type="number" placeholder={'例如: 21'} />
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
})(ComponentsMenuManagerForm);
