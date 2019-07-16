import React, { Component } from 'react';
import { Modal, Spin } from 'antd';
import PropTypes from 'prop-types';

class CommonReadInfoModal extends Component {
  static propTypes = {
    width: PropTypes.number,
    title: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }
  render() {
    return (
      <Modal
        width={this.props.width}
        title={this.props.title}
        visible={this.props.visible}
        onCancel={this.props.hide}
        footer={null}
      >
        <Spin spinning={this.props.loading}>
          {this.props.children}
        </Spin>
      </Modal>
    );
  }
}

export default CommonReadInfoModal;