import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Form, Button, Divider, Tabs, Popconfirm } from 'antd';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class ComponentsGroupManagerLefts extends Component {
  static propTypes = {
    table: ImmutablePropTypes.list.isRequired,
    loading: PropTypes.bool.isRequired,
  }
  constructor(props) {
    super(props);
    this.leftsTableGet();
  }
  leftsTableGet = () => {
    this.props.leftsTableGet().then(res => {
      const first = res.get('result').get(0) && res.get('result').get(0);
      if (!first) { return; }
      const groupId = first.get('id');
      const refererType = first.get('refererType');
      this.props.setType(refererType);
      // this.props.setSearchData({ groupId });
      this.props.tableGet({
        ...this.props.searchData.toJS(),
        groupId,
        currentPage: 1,
      }, refererType);
    });
  }
  group = groupId => {
    return this.props.table.find(v => v.get('id') == groupId);
  }
  groupType = group => {
    if (group) {
      return group.get('refererType');
    }
    return '';
  }
  handleChange = groupId => {
    this.props.mainFormHide();
    const refererType = this.groupType(this.group(groupId));
    this.props.setType(refererType);
    // this.props.setSearchData({ groupId });
    this.props.tableGet({
      ...this.props.searchData.toJS(),
      groupId,
      currentPage: 1,
    }, refererType);
  }
  del = () => {
    this.props.leftsTableDelete({
      id: this.props.searchData.get('groupId'),
    }).then(() => {
      this.leftsTableGet();
    });
  }
  get groupName () {
    const group = this.props.table.find(v => v.get('id') == this.props.searchData.get('groupId'));
    if (group) {
      return group.get('name');
    }
    return '';
  }
  render() {
    return (
      <React.Fragment>
        <Form layout="inline" style={{ margin: 6 }}>
          <FormItem>
            <Button onClick={this.props.add} loading={this.props.loading || this.props.table.some(t => t.get('loading'))} type="primary">新增</Button>
            {this.props.table.size > 0 &&
              <React.Fragment>
                <Button onClick={this.props.get} loading={this.props.loading || this.props.table.some(t => t.get('loading'))} style={{ marginLeft: 8 }}>修改</Button>
                <Popconfirm title={`是否确认删除 ${this.groupName}`} onConfirm={this.del} okText="确定" cancelText="取消">
                  <Button loading={this.props.loading || this.props.table.some(t => t.get('loading'))} style={{ marginLeft: 8 }} type="danger">删除</Button>
                </Popconfirm>
              </React.Fragment>
            }
          </FormItem>
        </Form>
        <Divider style={{ margin: '0 0 -1px 0' }} />
        <Tabs
          tabPosition="left"
          className="lefts-tabs"
          onChange={this.handleChange}
        >
          {
            [].concat(this.props.table.toJS()).map(v => <TabPane tab={v.name} key={v.id} />)
          }
        </Tabs>
      </React.Fragment>
    );
  }
}
