import React, { Component } from 'react';
import { Form, Row, Col, Select } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;
const Option = Select.Option;

class ComponentsChannelAdminManagerConfigForm extends Component {
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
              <FormItem label={'角色选择'} {...formItemLayout}>
                {getFieldDecorator('roleIdList')(
                  <Select mode="multiple">
                    {this.props.allMenu.map(t => <Option key={t.get('roleId')}>{t.get('roleName')}</Option>)}
                  </Select>
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
})(ComponentsChannelAdminManagerConfigForm);
