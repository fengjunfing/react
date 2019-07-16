import React from 'react';
import { Modal } from 'antd';

export const lookImage = ({ alt, src }) => {
  Modal.info({
    maskClosable: true,
    centered: true,
    icon: '',
    className: 'look-image-modal',
    content: <img alt={alt} src={src} style={{ width: '100%' }} />
  });
};
