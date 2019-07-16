import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonSearchForm from '@/components/common/SearchForm';

const FormItem = Form.Item;

class ComponentsGroupManagerNameSearchFormRight extends Component {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    table: ImmutablePropTypes.list.isRequired,
    searchData: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool.isRequired,
    tableGet: PropTypes.func.isRequired,
  }
  get id () {
    return this.props.leftData.get('id');
  }
  searchExchangeBefore = searchData => {
    delete searchData.shopId;
    delete searchData.merchantId;
    switch (this.props.types) {
    case 'MAINTAIN':
      searchData.shopId = this.id;
      break;
    case 'SECOND_HAND_CAR':
      searchData.merchantId = this.id;
      break;
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <CommonSearchForm {...this.props} searchExchangeBefore={this.searchExchangeBefore} afterBtns={
        <Button style={{ marginLeft: 8 }} type="danger" onClick={this.props.nameFormReset}>返回</Button>
      } loading={this.props.loading || this.props.table.some(t => t.get('loading'))}>
        <FormItem>
          {getFieldDecorator('name')(
            <Input addonBefore={'名称'} />
          )}
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
    return values;
  }
})(ComponentsGroupManagerNameSearchFormRight);
