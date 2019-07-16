import React, { Component } from 'react';
import { Form, Row, Col, Cascader, Button, notification, Table } from 'antd';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonFormModal from '@/components/common/FormModal';

const FormItem = Form.Item;

class ComponentsFinProjectManagerForm extends Component {
  static propTypes = {
    formData: ImmutablePropTypes.map.isRequired,
  }
  constructor(props) {
    super(props);
    this.props.carBrandsList();
  }
  state = {
    v2: [],
  }
  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const { __type, value } = targetOption;
    if (__type === 'Brands') {
      this.props.carSeriesList({
        brandId: value,
      });
    } else if (__type === 'Series') {
      const BrandsTargetOption = selectedOptions[selectedOptions.length - 2];
      this.props.carModelList({
        seriesId: value,
        brandId: BrandsTargetOption.value,
      });
    }
  }
  handleCarModelChange = (v,v2 = []) => {
    this.setState({
      v2,
    });
  }
  add = () => {
    this.props.form.validateFields(err => {
      if (!err && this.state.v2.length === 3) {
        const [,, { value: carModelId, label: name }] = this.state.v2;
        const list = this.props.formData.get('list').toJS();
        if (list.findIndex(item => item.carModelId === carModelId) === -1) {
          list.push({
            carModelId,
            name,
          });
          this.props.formSetData({
            list,
          });
          this.props.form.resetFields();

        } else {
          return notification.warning({
            message: '警告',
            description: '车型已存在！',
          });
        }
      }
    });
  }
  del = index => {
    const list = this.props.formData.get('list').toJS();
    list.splice(index, 1);
    this.props.formSetData({
      list,
    });
  }
  get list () {
    const list = this.props.formData.get('list');
    if (list) {
      return list.toJS();
    }
    return [];
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const columns = [
      {
        title: '序号',
        key: 'index',
        align: 'center',
        width: 60,
        render: (...args) => args[2] + 1,
      },
      {
        title: '车型名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 180,
        render: (text, record, index) => {
          return (
            <React.Fragment>
              <a onClick={() => this.del(index)}>删除</a>
            </React.Fragment>
          );},
      },
    ];
    return (
      <CommonFormModal {...this.props} width={600}>
        <Form style={{ margin: '8px 16px' }}>
          <Row>
            <Col span={12}>
              <FormItem label={'车型'} {...formItemLayout}>
                {getFieldDecorator('refererNo', {
                  rules: [{
                    required: true,
                    message: '请选择名称!',
                  }],
                })(
                  <Cascader
                    options={this.props.carList.toJS()}
                    loadData={this.loadData}
                    placeholder=""
                    onChange={this.handleCarModelChange}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <Button type="primary" style={{ margin: '4px 0 0 4px' }} onClick={this.add}>添加</Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                rowKey={(record, index) => record.id || index}
                dataSource={this.list} columns={columns} pagination={false} />
            </Col>
          </Row>
        </Form>
      </CommonFormModal>
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
})(ComponentsFinProjectManagerForm);
