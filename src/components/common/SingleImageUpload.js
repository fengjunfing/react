import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, message, Spin } from 'antd';


class SingleUpload extends Component {
  static defaultProps = {
    imgStyles: {}
  }
  static propTypes = {
    uploadLoading: PropTypes.bool.isRequired,
    formData: PropTypes.object.isRequired,
    nowFormData: PropTypes.object.isRequired,
    filePath: PropTypes.string.isRequired,
    fileUrl: PropTypes.string.isRequired,
    openUploadLoading: PropTypes.func.isRequired,
    closeUploadLoading: PropTypes.func.isRequired,
    split: PropTypes.bool,
    imgStyles: PropTypes.object,
  }
  beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPG) {
      message.error('只能上传jpg或者png!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('必须小于2mb!');
    }
    return isJPG && isLt2M;
  }
  handleChange (info) {
    if (info.file.status === 'uploading') {
      this.props.openUploadLoading(this.props.nowFormData);
      return;
    }
    if (info.file.status === 'done') {
      let filePath = info.file.response.result.filePath;
      let fileUrl = info.file.response.result.fileUrl;
      if (this.props.split) {
        let oldFileUrl = this.props.formData.get(this.props.fileUrl);
        let oldfilePath = this.props.formData.get(this.props.filePath);
        if (oldFileUrl) {
          oldFileUrl = oldFileUrl.split(',');
          oldFileUrl.push(fileUrl);
          fileUrl = oldFileUrl.join(',');
        }
        if (oldfilePath) {
          oldfilePath = oldfilePath.split(',');
          oldfilePath.push(filePath);
          filePath = oldfilePath.join(',');
        }
      }
      this.props.closeUploadLoading({
        ...this.props.nowFormData,
        [this.props.filePath]: filePath,
        [this.props.fileUrl]: fileUrl,
      });
    }
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.props.uploadLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    let imageUrl = this.props.formData.get(this.props.fileUrl);
    if (this.props.split) {
      imageUrl = null;
    }
    return (
      <Upload
        name="file"
        data={{source: 'sign'}}
        showUploadList={false}
        listType="picture-card"
        action="http://fms.kingcars.cn/file/uploadFile"
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange.bind(this)}>
        {imageUrl ? <Spin spinning={this.props.uploadLoading}><img src={`${imageUrl}/w/84/h/84`} alt="图片" style={{ ...this.props.imgStyles }} /></Spin> : uploadButton}
      </Upload>
    );
  }
}

export default SingleUpload;