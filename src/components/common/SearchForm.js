import React, { Component } from 'react';
import { Form, Button } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const FormItem = Form.Item;

class SearchForm extends Component {
  static propTypes = {
    searchData: ImmutablePropTypes.map.isRequired,
    loading: PropTypes.bool.isRequired,
    tableGet: PropTypes.func.isRequired,
    searchDisabled: PropTypes.bool,
    searchSubmitBefore: PropTypes.func,
    searchExchangeBefore: PropTypes.func,
    disabledAutoSearch: PropTypes.bool,
    afterBtns: PropTypes.node,
    appendParams: PropTypes.array,
  }
  static defaultProps = {
    appendParams: [],
  }
  constructor (props) {
    super(props);
    !this.props.disabledAutoSearch && this.searchSubmit();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.searchSubmit();
  }
  searchSubmit() {    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const searchData = {
          ...this.props.searchData.toJS(),
          ...values,
          currentPage: 1,
        };
        if (this.props.searchExchangeBefore) {
          this.props.searchExchangeBefore(searchData);
        }
        for (var v in searchData) {
          if (searchData[v] && searchData[v].format) {
            searchData[v] = searchData[v].format('YYYY-MM-DD');
          } else {
            searchData[v] = searchData[v] === (undefined || null) ? '' : searchData[v];
          }
        }
        if (this.props.searchSubmitBefore) {
          this.props.searchSubmitBefore(searchData);
        }
        this.props.tableGet(searchData, ...this.props.appendParams);
      }
    });
  }
  render() {
    return (
      <Form layout="inline" onSubmit={this.handleSubmit} style={{ margin: 6 }}>
        {this.props.children}
        <FormItem>
          {
            this.props.children ?
              <React.Fragment>
                <Button type="primary" htmlType="submit" disabled={this.props.searchDisabled} loading={this.props.loading}>搜索</Button>
                <Button style={{ marginLeft: 8 }} onClick={() => { this.props.form.resetFields();  setTimeout(() => this.props.searchDisabled ? '' : this.searchSubmit(), 0); }} disabled={this.props.loading}>清空</Button>
                {this.props.afterBtns}
              </React.Fragment> : 
              <Button type="primary" htmlType="submit" loading={this.props.loading}>按照条件搜索</Button>
          }
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);
