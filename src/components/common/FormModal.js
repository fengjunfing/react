import React, { Component } from 'react';
import { Modal, Spin, Button } from 'antd';
import PropTypes from 'prop-types';

class CommonFormModal extends Component {
  static propTypes = {
    width: PropTypes.number,
    title: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }
  render() {
    return (
      <Modal
        width={this.props.width}
        title={this.props.title}
        visible={this.props.visible}
        onCancel={this.props.hide}
        footer={!this.props.notFooter && [
          <Button key="back" onClick={this.props.hide}>返回</Button>,
          <Button key="submit" type="primary" loading={this.props.loading} onClick={this.props.handleSubmit}>提交</Button>,
        ]}
      >
        <Spin spinning={this.props.loading}>
          {this.props.children}
        </Spin>
      </Modal>
    );
  }
}

export default CommonFormModal;