import React, { Component } from 'react';
import { Form, Input, Cascader } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonSearchForm from '@/components/common/SearchForm';
import areaData from '@/publicData/areaData';
import chinaAreaCascadeValueMap from '@/publicData/chinaAreaCascadeValueMap';

const FormItem = Form.Item;

class ComponentsBankManagerSearchForm extends Component {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    table: ImmutablePropTypes.list.isRequired,
    searchData: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool.isRequired,
    tableGet: PropTypes.func.isRequired,
  }
  searchSubmitBefore = values => {
    if (values && values.belongRegion && values.belongRegion.length > 0) {
      values.belongRegion = values.belongRegion[values.belongRegion.length - 1];
    }
    delete values.currentPage;
    return values;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <CommonSearchForm {...this.props} searchSubmitBefore={this.searchSubmitBefore} loading={this.props.loading || this.props.table.some(t => t.get('loading'))}>
        <FormItem>
          {getFieldDecorator('fullName')(
            <Input addonBefore={'全称'} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('name')(
            <Input addonBefore={'简称'} />
          )}
        </FormItem>
        <FormItem>
          <Input className={'input-select-cascader'} addonBefore={'所属区域'} addonAfter={
            getFieldDecorator('belongRegion')(
              <Cascader options={areaData} changeOnSelect placeholder={''} />
            )
          } />
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
    if (formData.belongRegion && (typeof formData.belongRegion === 'string')) {
      values.belongRegion = Form.createFormField({
        value: chinaAreaCascadeValueMap[formData.belongRegion],
      });
    }
    return values;
  }
})(ComponentsBankManagerSearchForm);
