import React, { Component } from 'react';
import { Form, Input, Cascader } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonSearchForm from '@/components/common/SearchForm';
import { areaDataLevel2BaseChina as areaDataLevel2 } from '@/publicData/areaDataLevel2';
import { chinaAreaCascadeValueMapBaseChina as chinaAreaCascadeValueMap } from '@/publicData/chinaAreaCascadeValueMap';

const FormItem = Form.Item;

class ComponentsICBCEExclusiveSerSearchForm extends Component {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    table: ImmutablePropTypes.list.isRequired,
    searchData: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool.isRequired,
    tableGet: PropTypes.func.isRequired,
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <CommonSearchForm {...this.props} loading={this.props.loading || this.props.table.some(t => t.get('loading'))}>
        <FormItem>
          {getFieldDecorator('name')(
            <Input addonBefore={'名称'} />
          )}
        </FormItem>
        <FormItem>
          <Input addonBefore={'所属区域'} className={'inputCascader'} addonAfter=
            {getFieldDecorator('belongRegion')(
              <Cascader options={areaDataLevel2} changeOnSelect placeholder={''} />
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
    if (formData.belongRegion && (typeof formData.belongRegion === 'string')) {
      values.belongRegion = Form.createFormField({
        value: chinaAreaCascadeValueMap[formData.belongRegion],
      });
    }
    return values;
  }
})(ComponentsICBCEExclusiveSerSearchForm);
