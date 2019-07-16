import React, { Component } from 'react';
import { Form, Input, Select, Button } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CommonSearchForm from '@/components/common/SearchForm';

const FormItem = Form.Item;
const { Option } = Select;

class ComponentsMenuManagerSearchForm extends Component {
  static propTypes = {
    searchData: ImmutablePropTypes.map.isRequired,
    table: ImmutablePropTypes.list.isRequired,
    appId: ImmutablePropTypes.list.isRequired,
    loading: PropTypes.bool.isRequired,
    appIdLoading: PropTypes.bool.isRequired,
    tableGet: PropTypes.func.isRequired,
    appIdGet: PropTypes.func.isRequired,
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <CommonSearchForm {...this.props} searchDisabled={!getFieldValue('appId')}>
        <FormItem>
          <Button onClick={() => this.props.appIdGet()} loading={this.props.appIdLoading} type={'dashed'}  style={{ marginLeft: 6 }}>刷新应用列表</Button>
        </FormItem>
        <FormItem>
          <Input addonBefore={'应用名称'} className={'inputSelect'} addonAfter=
            {getFieldDecorator('appId')(
              <Select style={{ minWidth: 90 }} loading={this.props.appIdLoading} placeholder={'必须选择'} dropdownMatchSelectWidth={false} dropdownStyle={{ maxWidth: 200 }}>
                {
                  this.props.appId.map(t => <Option key={t.get('id')}>{t.get('name')}</Option>)
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
    return values;
  }
})(ComponentsMenuManagerSearchForm);
