import React, { Component } from 'react';
import { Spin, Button, Tabs } from 'antd';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const TabPane = Tabs.TabPane;

class CommonTabsContainer extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    tabs: ImmutablePropTypes.list.isRequired,
    tabsRendersAndMethods: PropTypes.object.isRequired,
  }
  state = {
    newKey: this.props.defaultActiveKey,
  }
  handleChange = newKey => {
    this.setState({
      newKey,
    });
  }
  get btns () {
    return this.props.tabsRendersAndMethods[this.state.newKey].btns;
  }
  render() {
    return (
      <Spin spinning={this.props.loading}>
        <Tabs defaultActiveKey={this.props.defaultActiveKey} onChange={this.handleChange} tabBarExtraContent={
          <React.Fragment>
            {this.btns}
            <Button key="back" onClick={this.props.hide} style={{ marginRight: 6 }}>返回</Button>
          </React.Fragment>
        }>
          {
            this.props.tabs.toJS().map(v => (
              <TabPane key={v.key} tab={v.title}>{this.props.tabsRendersAndMethods[v.key].render}</TabPane>
            ))
          }
        </Tabs>
      </Spin>
    );
  }
}

export default CommonTabsContainer;