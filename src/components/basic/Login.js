import React, { Component } from 'react';
import { Form, Icon, Input, Button, Card } from 'antd';
import PropTypes from 'prop-types';
import { base64 } from '@/util';
import loginBg from '@/images/login_bg.jpg';

const FormItem = Form.Item;

class ComponentsLogin extends Component {
static propTypes = {
  login: PropTypes.func.isRequired
}
handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if (!err) {
      for (var v in values) {
        values[v] = base64.encode(values[v]);
      }
      this.props.login(values);
    }
  });
}
render() {
  const { getFieldDecorator } = this.props.form;
  return (
    <div style={{ backgroundImage: `url(${loginBg})`, height: '100vh', backgroundPositionY: 'center' }}>
      <Card title={<span><Icon type="login" style={{ color: 'black' }} /> 欢迎登录</span>} bordered={false} style={{ width: 300, position: 'absolute', top: '50%', right: 160, transform: 'translateY(-60%)', boxShadow: '0 0 5px black' }}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('loginName', {
              rules: [{ required: true, message: '请输入帐号!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'black' }} />} placeholder="帐号" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'black' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          登录
          </Button>
        </Form>
      </Card>
    </div>
  );
}
}

export default Form.create()(ComponentsLogin);
