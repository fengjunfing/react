import React, { Component } from 'react';
import { Form, Input, Row, Col, Button, Select } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

class ComponentsRoleManagerForm extends Component {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
    appId: ImmutablePropTypes.list.isRequired,
    appIdLoading: PropTypes.bool.isRequired,
    appIdGet: PropTypes.func.isRequired,
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const singleLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <CommonFormModal {...this.props} width={500}>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            {
              this.props.formData.get('id') ? '' :
                <React.Fragment>
                  <Col span={16}>
                    <FormItem label={'选择应用'} {...formItemLayout}>
                      {getFieldDecorator('appId', {
                        rules: [{
                          required: true,
                          message: '请选择应用!',
                        }],
                      })(
                        <Select style={{ minWidth: 90 }} loading={this.props.appIdLoading} placeholder={'必须选择'} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                          {
                            this.props.appId.map(t => <Option key={t.get('id')}>{t.get('name')}</Option>)
                          }
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <Button onClick={() => this.props.appIdGet()} loading={this.props.appIdLoading} type={'dashed'} style={{ margin: 4 }}>刷新应用列表</Button>
                  </Col>
                </React.Fragment>
            }
            <Col span={24}>
              <FormItem label={'角色名称'} {...singleLayout}>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true,
                    message: '请输入名称!',
                  }, {
                    max: 8,
                    message: '不能超过8个字'
                  }],
                })(
                  <Input placeholder={'例如：超级管理员'} />
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label={'类型'} {...singleLayout}>
                {getFieldDecorator('type', {
                  rules: [{
                    required: true,
                    message: '请选择类型!',
                  }],
                })(
                  <Select>
                    {
                      Object.entries(this.props.dictData.get('roleManager_type').toJS()).map(t => <Option key={t[0]}>{t[1]}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label={'备注'} {...singleLayout}>
                {getFieldDecorator('remarks', {
                  rules: [{
                    max: 100,
                    message: '不能超过100个字'
                  }],
                })(
                  <TextArea placeholder="不能超过100个字" autosize={{ minRows: 4 }} style={{ resize: 'none' }} />
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
})(ComponentsRoleManagerForm);
