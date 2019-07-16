import React, { Component } from 'react';
import { Form, Row, Col, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;

class ComponentsUserManagerConfigForm extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
    allRole: ImmutablePropTypes.list.isRequired,
    userRole: ImmutablePropTypes.list.isRequired,
  }
  render() {
    const roleData = this.props.userRole.reduce((p, n) => ([...p, n.get('roleId')]), []);
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
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
            {
              this.props.allRole.map(t => <Col span={24} key={t.get('appId')}>
                <FormItem label={t.get('appName')} {...formItemLayout}>
                  {getFieldDecorator('app_' + t.get('appId'), {
                    initialValue: t.get('roleList').filter(item => roleData.indexOf(item.get('id')) > -1).map(i => i.get('id')).toJS(),
                  })(
                    <Checkbox.Group>
                      {
                        t.get('roleList').map(n => <Checkbox style={{ margin: '0 0 4px 6px' }} key={n.get('id')} value={n.get('id')}>{n.get('name')}</Checkbox>)
                      }
                    </Checkbox.Group>
                  )}
                </FormItem>
              </Col>)
            }
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
})(ComponentsUserManagerConfigForm);
