import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Button, message } from 'antd';


class SingleFileUpload extends Component {
  static propTypes = {
    uploadLoading: PropTypes.bool.isRequired,
    formData: PropTypes.object.isRequired,
    nowFormData: PropTypes.object.isRequired,
    filePath: PropTypes.string.isRequired,
    openUploadLoading: PropTypes.func.isRequired,
    closeUploadLoading: PropTypes.func.isRequired,
  }
  beforeUpload(file) {
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error('只能上传pdf!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('必须小于2mb!');
    }
    return isPDF && isLt2M;
  }
  handleChange (info) {
    if (info.file.status === 'uploading') {
      this.props.openUploadLoading(this.props.nowFormData);
      return;
    }
    if (info.file.status === 'done') {
      this.props.closeUploadLoading({
        ...this.props.nowFormData,
        [this.props.filePath]: info.file.response.result.fileUrl,
      });
    }
  }
  render() {
    const filePath = this.props.formData.get(this.props.filePath);
    return (
      <React.Fragment>
        <Upload
          name="file"
          accept="application/pdf"
          data={{source: 'sign'}}
          showUploadList={false}
          action="http://fms.kingcars.cn/file/uploadFile"
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange.bind(this)}>
          <Button>
            <Icon type={this.props.uploadLoading ? 'loading' : 'upload'} /> 
            {
              this.props.uploadLoading ? '正在上传' :
                filePath ? '替换文件' : '上传文件'
            }
          </Button>
        </Upload>
        {
          filePath ?
            <Button style={{ marginLeft: 6 }}>
              <a href={filePath} rel="noopener noreferrer" target="_blank">查看</a>
            </Button> : ''
        }
      </React.Fragment>
    );
  }
}


export default SingleFileUpload;