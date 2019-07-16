import React, { Component } from 'react';
import { Form, Input, Select, Divider, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonSearchForm from '@/components/common/SearchForm';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

class ComponentsModelManagerSearchForm extends Component {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    table: ImmutablePropTypes.list.isRequired,
    searchData: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool.isRequired,
    tableGet: PropTypes.func.isRequired,
  }
  hankPicker = null
  get seriesList () {
    if (this.brandId) {
      return this.props.seriesList.filter(v => v.brandId == this.brandId);
    }
    return [];
  }

  get brandId () {
    return this.props.form.getFieldsValue().brandId;
  }

  handleBrandIdChange = () => {
    this.props.form.setFieldsValue({
      seriesId: '',
    });
  }

  // https://github.com/ant-design/ant-design/issues/14017
  // https://www.cnblogs.com/zyl-Tara/p/10197177.html
  hankYearChange = v => {
    this.props.form.setFieldsValue({
      modelYear: v,
    });
    //  强制关闭补丁
    this.hankPicker.picker.setState({ open: false });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <CommonSearchForm {...this.props} loading={this.props.loading || this.props.table.some(t => t.get('loading'))}>
        <FormItem>
          <Input addonBefore={'品牌名称'} className={'inputSelect'} addonAfter=
            {getFieldDecorator('brandId')(
              <Select onChange={this.handleBrandIdChange} style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                {
                  this.props.brandsList.map(t => <Option key={t.id}>{t.name}</Option>)
                }
              </Select>
            )}
          />
        </FormItem>
        <FormItem>
          <Input addonBefore={'车系名称'} className={'inputSelect'} addonAfter=
            {getFieldDecorator('seriesId')(
              <Select style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                {
                  this.seriesList.map(t => <Option key={t.id}>{t.name}</Option>)
                }
              </Select>
            )}
          />
        </FormItem>
        <FormItem>
          {getFieldDecorator('name')(
            <Input addonBefore={'车型名称'} />
          )}
        </FormItem>
        <FormItem>
          <Input addonBefore={'年款'} className="inputDate" addonAfter=
            {getFieldDecorator('modelYear')(
              <DatePicker
                ref={ref => (this.hankPicker = ref) }
                onPanelChange={this.hankYearChange}
                mode="year"
                format="YYYY" />
            )}
          />
        </FormItem>
        <Divider style={{ margin: '3px 0 -1px 0' }} />
        <FormItem>
          <Input addonBefore={'状态'} className={'inputSelect'} addonAfter=
            {getFieldDecorator('status')(
              <Select style={{ minWidth: 150 }} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                {
                  [['', '所有']].concat(Object.entries(this.props.dictData.get('CAR_STATUS').toJS())).map(t => <Option key={t[0]} value={t[0]}>{t[1]}</Option>)
                }
              </Select>
            )}
          />
        </FormItem>
      </CommonSearchForm>
    );
  }
}

export default Form.create({
  mapPropsToFields(props) {
    const formData = props.searchData.toJS();
    const values = {};
    for (var v in formData) {
      values[v] = Form.createFormField({
        value: formData[v] === undefined ? '' : formData[v].constructor === Number ? '' + formData[v] : formData[v],
      });
    }
    if (formData.modelYear) {
      values.modelYear = Form.createFormField({
        value: moment(formData.modelYear)
      });
    } else {
      delete values.modelYear;
    }
    return values;
  }
})(ComponentsModelManagerSearchForm);
