import React, { Component } from 'react';
import { Form, Row, Col, TreeSelect } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;

class ComponentsRoleManagerFuncForm extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <CommonFormModal {...this.props} width={580}>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={24}>
              <FormItem label={'功能选择'} {...formItemLayout}>
                {getFieldDecorator('menuIds')(
                  <TreeSelect
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={this.props.allFunc.toJS()}
                    multiple
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
    return values;
  }
})(ComponentsRoleManagerFuncForm);
