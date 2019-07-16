import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

export const recommendedImageSize = (w, h) => `建议尺寸 ${w}px × ${h}px`;

export const recommendedImageSizeText = (w, h, type = 'danger') => (<Text type={type}>{recommendedImageSize(w, h)}</Text>);
