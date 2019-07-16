import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommonTabsContainer from '@/components/common/TabsContainer';
import { Button, notification } from 'antd';
import Tabs1 from '@/containers/channel/ChannelManager/tabs1';
import Tabs2 from '@/containers/channel/ChannelManager/tabs2';
import Tabs3 from '@/containers/channel/ChannelManager/tabs3';
import Tabs4 from '@/containers/channel/ChannelManager/tabs4';
import Tabs5 from '@/containers/channel/ChannelManager/tabs5';

class ComponentsChannelManagerConfig extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  }
  render() {
    const self = this;
    const tabsRendersAndMethods = {
      '1': {
        ref: null,
        render: (<Tabs1 getRef={ref => { tabsRendersAndMethods['1'].ref = ref; }} />),
        submit() {
          this.ref.validateFields((err, values) => {
            if (!err) {
              const formData = {
                ...this.ref.props.formData.toJS(),
                ...values,
              };
              for (var v in formData) {
                formData[v] = formData[v] === undefined ? '' : formData[v];
              }
              self.props.appConfigUpdateAppConfig(formData).then(res => {
                notification.success({
                  message: res.get('result'),
                });
              });
            }
          });
        },
        btns: (<Button key="submit" type="primary" style={{ marginRight: 6 }} onClick={() => tabsRendersAndMethods['1'].submit()} >保存</Button>),
      },
      '2': {
        ref: null,
        render: (<Tabs2 getRef={ref => { tabsRendersAndMethods['2'].ref = ref; }} />),
        submit() {
          this.ref.validateFields((err, values) => {
            if (!err) {
              const formData = {
                ...this.ref.props.formData.toJS(),
                ...values,
              };
              for (var v in formData) {
                formData[v] = formData[v] === undefined ? '' : formData[v];
              }
              self.props.meltingEBoughtConfigUpdateConfig(formData).then(res => {
                notification.success({
                  message: res.get('result'),
                });
              });
            }
          });
        },
        btns: (<Button key="submit" type="primary" style={{ marginRight: 6 }} onClick={() => tabsRendersAndMethods['2'].submit()} >保存</Button>),
      },
      '3': {
        render: (<Tabs3 />),
        submit() {
          self.props.contactsFormReset();
          self.props.contactsFormSetData({ channelId: self.props.base.get('id') });
          self.props.contactsFormShow('新增');
        },
        btns: (<Button key="submit" type="primary" style={{ marginRight: 6 }} onClick={() => tabsRendersAndMethods['3'].submit()} >新增联系人</Button>),
      },
      '4': {
        ref: null,
        render: (<Tabs4 getRef={ref => { tabsRendersAndMethods['4'].ref = ref; }}/>),
        submit() {
          this.ref.validateFields((err, values) => {
            if (!err) {
              const formData = {
                ...values,
                channelId: self.props.base.get('id'),
              };
              for (var v in formData) {
                formData[v] = formData[v] === undefined ? '' : formData[v];
              }
              if (!formData.serviceIdList) {
                formData.serviceIdList = [];
              }
              self.props.addOrUpdateDefaultConfig(formData).then(res => {
                notification.success({
                  message: res.get('result'),
                });
              });
            }
          });
        },
        btns: (<Button key="submit" type="primary" style={{ marginRight: 6 }} onClick={() => tabsRendersAndMethods['4'].submit()} >保存</Button>),
      },
      '5': {
        ref: null,
        render: (<Tabs5 getRef={ref => { tabsRendersAndMethods['5'].ref = ref; }} />),
        submit() {
          this.ref.validateFields((err, values) => {
            if (!err) {
              const formData = {
                ...this.ref.props.formData.toJS(),
                ...values,
              };
              for (var v in formData) {
                formData[v] = formData[v] === undefined ? '' : formData[v];
              }
              formData.channelId = self.props.base.get('id');
              self.props.insertOrUpdateInitConfig(formData).then(res => {
                notification.success({
                  message: res.get('result'),
                });
              });
            }
          });
        },
        btns: (<Button key="submit" type="primary" style={{ marginRight: 6 }} onClick={() => tabsRendersAndMethods['5'].submit()} >保存</Button>),
      },
    };
    return (
      <CommonTabsContainer {...this.props} tabsRendersAndMethods={tabsRendersAndMethods} defaultActiveKey={'1'} width={800} customStyle={{ height: 'calc(100vh - 170px)', overflow: 'auto' }} />
    );
  }
}

export default ComponentsChannelManagerConfig;
