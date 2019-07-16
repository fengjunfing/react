import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

class CommmonSingleImageModal extends Component {
  static proptTypes = {
    data: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    hide: PropTypes.func.isRequired,
  }
  render() {
    return (
      <Modal
        width={548}
        title={this.props.title}
        visible={this.props.visible}
        onCancel={this.props.hide}
        footer={false}
        bodyStyle={{ position: 'relative', textAlign: 'center' }}
      >
        <a target="_blank" rel="noopener noreferrer" href={this.props.data}>
          <img src={this.props.data} style={{ maxWidth: '100%' }} />
        </a>
      </Modal>
    );
  }
}

export default CommmonSingleImageModal;