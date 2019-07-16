import React, { Component } from 'react';
import { Divider, Spin, Button } from 'antd';
import PropTypes from 'prop-types';

class CommonFormContainer extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    hide: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    customStyle: PropTypes.object.isRequired,
  }
  render() {
    return (
      <Spin spinning={this.props.loading}>
        <div style={{ margin: 10 }}>
          <span style={{ fontSize: 18, marginTop: 2, display: 'inline-block' }}>{this.props.title}</span>
          <Button key="back" onClick={this.props.hide} style={{ float: 'right', marginRight: 6 }}>返回</Button>
        </div>
        <Divider style={{ margin: '14px 0 12px 0' }} />
        <div style={this.props.customStyle}>
          {this.props.children}
          <Divider style={{ margin: '0 0 12px 0' }} />
          <div style={{ float: 'right', marginRight: 15 }}>
            <Button key="submit" type="primary" loading={this.props.loading} onClick={this.props.handleSubmit}>提交</Button>
          </div>
        </div>
      </Spin>
    );
  }
}

export default CommonFormContainer;