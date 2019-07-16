import React, { Component } from 'react';
import { Form, Row, Col, Icon, Modal } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SingleImageUpload from '@/components/common/SingleImageUpload';
import CommonFormReadContainer from '@/components/common/FormReadContainer';
import { recommendedImageSizeText } from '@/util';
import style from './style.module.css';

const FormItem = Form.Item;

class ComponentsModelManagerForm extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    uploadLoading: PropTypes.bool.isRequired,
    formData: ImmutablePropTypes.map.isRequired,
    openUploadLoading: PropTypes.func.isRequired,
    closeUploadLoading: PropTypes.func.isRequired,
  }
  state = {
    modalPCShow: false,
    modalPC: null,
    modalPCIndex: 0,
    modalPCFlag: 'carouselPicture',
  }
  handleConfirmPassword(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入不一致！');
    }
    callback();
  }
  get CPList () {
    const carouselPicture = this.props.formData.get('carouselPicture');
    if (carouselPicture) {
      return carouselPicture.split(',');
    }
    return [];
  }
  handleImageLook = index => {
    if (typeof index !== 'number') {
      console.log(this.props.formData.get('cover'));
      return this.setState({
        modalPCShow: true,
        modalPC: this.props.formData.get('cover'),
        modalPCFlag: 'cover',
      });
    }
    const carouselPicture = this.props.formData.get('carouselPicture').split(',');
    const newPC = carouselPicture[index];
    this.setState({
      modalPCShow: true,
      modalPC: newPC,
      modalPCIndex: index,
      modalPCFlag: 'carouselPicture',
    });
  }
  modalPCCancel = () => {
    this.setState({
      modalPCShow: false,
      modalPC: null,
      modalPCIndex: 0,
    });
  }
  lookToLeft = () => {
    if (this.state.modalPCIndex === 0) {
      return;
    }
    const carouselPicture = this.props.formData.get('carouselPicture').split(',');
    const newIndex = this.state.modalPCIndex - 1;
    const newPC = carouselPicture[newIndex];
    this.setState({
      modalPC: newPC,
      modalPCIndex: newIndex,
    });
  }
  lookToRight = () => {
    const carouselPicture = this.props.formData.get('carouselPicture').split(',');
    if (carouselPicture.length - 1 === this.state.modalPCIndex) {
      return;
    }
    const newIndex = this.state.modalPCIndex + 1;
    const newPC = carouselPicture[newIndex];
    this.setState({
      modalPC: newPC,
      modalPCIndex: newIndex,
    });
  }
  handleImageDelete = index => {
    if (!this.titleFlag) {
      return;
    }
    const carouselPicture = this.props.formData.get('carouselPicture').split(',');
    carouselPicture.splice(index, 1);
    this.props.formSetData({
      carouselPicture: carouselPicture.join(','),
    });
  }
  handleImageToLeft = index => {
    if (!this.titleFlag || index === 0) {
      return;
    }
    const carouselPicture = this.props.formData.get('carouselPicture').split(',');
    const newCP = carouselPicture.splice(index, 1);
    carouselPicture.splice(index - 1, 0, newCP);
    this.props.formSetData({
      carouselPicture: carouselPicture.join(','),
    });
  }
  handleImageToRight = index => {
    if (!this.titleFlag) {
      return;
    }
    const carouselPicture = this.props.formData.get('carouselPicture').split(',');
    if (index === carouselPicture.length - 1) {
      return;
    }
    const newCP = carouselPicture.splice(index, 1);
    carouselPicture.splice(index + 1, 0, newCP);
    this.props.formSetData({
      carouselPicture: carouselPicture.join(','),
    });
  }
  get titleFlag () {
    const [a, b] = this.props.title;
    return !([a,b].join('') === '详情');
  }
  render() {
    const { getFieldsValue } = this.props.form;
    const sigleItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const readForm = [
      [['品牌名称', 'brandName'], ['车系名称', 'seriesName']],
      [['车型名称', 'name'], ['厂商指导价(万)', 'guidePrice']],
      [['车型', 'modelType'], ['年款', 'modelYear']],
      [['排放标准', 'dischargeStandard'], ['变速箱', 'gearType']],
      [['动力类型', 'powerType'], ['整车质保', 'guaranteePeriod']],
      [['驱动模式', 'drivenMode'], ['发动机', 'engine']],
      [['发布年份', 'minRegYear'], ['进气方式', 'airIntake']],
    ];
    return (
      <CommonFormReadContainer {...this.props} showSubmitBtn={this.titleFlag} width={800} customStyle={{ height: 'calc(100vh - 170px)', overflow: 'auto' }}>
        <div className={style.basicInfo}>
          <div className={style.basicForm}>
            {
              readForm.map((v,i) => (
                <Row key={i}>
                  {
                    v.map(([name, value],j) => (
                      <Col key={j} span={v.length === 2 ? 12 : 8}>
                        <div className={style.singleInfo}>
                          <span className={style.title}>{name}：</span>
                          <span className={style.content}>
                            {
                              this.props.formData.get(value)
                            }
                          </span>
                        </div>
                      </Col>)
                    )
                  }
                </Row>)
              )
            }
          </div>
        </div>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col className="form-inline">
              <FormItem label={<span>车型封面 {recommendedImageSizeText(120, 80)}</span>} {...sigleItemLayout}>
                {
                  !this.titleFlag && this.props.formData.get('cover') && <span style={{ float: 'left', cursor: 'pointer' }}>
                    <div className="ant-upload ant-upload-select ant-upload-select-picture-card">
                      <span className={`ant-upload ${style.maskWrapper}`} role="button">
                        <img src={`${this.props.formData.get('cover')}/w/84/h/84`} style={{
                          width: 120,
                          height: 80,
                        }} alt="图片" />
                        {
                          <div className={style.mask}>
                            <div className={style.maskSub}>
                              <Icon type="eye" onClick={this.handleImageLook} theme="twoTone" style={{ fontSize: '20px', margin: '2px', cursor: 'pointer' }} />
                            </div>
                          </div>
                        }
                      </span>
                    </div>
                  </span>
                }
                {this.titleFlag && <SingleImageUpload
                  fileUrl="cover"
                  filePath="coverUrl"
                  nowFormData={getFieldsValue()}
                  {...this.props}
                  imgStyles={{
                    width: 120,
                    height: 80,
                  }}
                />}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col className="form-inline">
              <FormItem label={<span>车辆轮播图 {recommendedImageSizeText(375, 188)}</span>} {...sigleItemLayout}>
                {
                  this.CPList.map((v,i) => (
                    <span key={i} style={{ float: 'left' }}>
                      <div className="ant-upload ant-upload-select ant-upload-select-picture-card">
                        <span className={`ant-upload ${style.maskWrapper}`} role="button">
                          <img src={`${v}/w/84/h/84`} style={{
                            width: 120,
                            height: 60,
                          }} alt="图片" />
                          {
                            <div className={style.mask}>
                              <div className={style.maskSub}>
                                <Icon type="eye" onClick={this.handleImageLook.bind(this, i)} theme="twoTone" style={{ fontSize: '20px', margin: '2px', cursor: 'pointer' }} />
                                {this.titleFlag && <Icon type="delete" onClick={this.handleImageDelete.bind(this, i)} theme="twoTone" style={{ fontSize: '20px', margin: '2px', cursor: 'pointer' }} />}
                                {this.titleFlag && <Icon type="left-circle" onClick={this.handleImageToLeft.bind(this, i)} theme="twoTone" style={{ fontSize: '20px', margin: '2px', cursor: 'pointer' }} />}
                                {this.titleFlag && <Icon type="right-circle" onClick={this.handleImageToRight.bind(this, i)} theme="twoTone" style={{ fontSize: '20px', margin: '2px', cursor: 'pointer' }} />}
                              </div>
                            </div>
                          }
                        </span>
                      </div>
                    </span>
                  ))
                }
                {
                  this.titleFlag && <SingleImageUpload
                    split
                    fileUrl="carouselPicture"
                    filePath="carouselPictureUrl"
                    nowFormData={getFieldsValue()}
                    {...this.props}
                    imgStyles={{
                      width: 120,
                      height: 60,
                    }}
                  />
                }
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Modal
          visible={this.state.modalPCShow}
          footer={null}
          onCancel={this.modalPCCancel}
        >
          {this.state.modalPC && <img alt="图片" src={this.state.modalPC} style={{ width: '100%', height: '100%' }} />}
          {this.state.modalPCFlag === 'carouselPicture' && <Icon type="left-circle" onClick={this.lookToLeft} theme="twoTone" className={style.iconLeftPC} />}
          {this.state.modalPCFlag === 'carouselPicture' && <Icon type="right-circle" onClick={this.lookToRight} theme="twoTone" className={style.iconRightPC} />}
        </Modal>
      </CommonFormReadContainer>
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
})(ComponentsModelManagerForm);
