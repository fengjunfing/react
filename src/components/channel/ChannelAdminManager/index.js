import React from 'react';
import { Divider } from 'antd';
import ThisSearchForm from '@/containers/channel/ChannelAdminManager/searchForm';
import ThisTable from '@/containers/channel/ChannelAdminManager/table';
import ThisForm from '@/containers/channel/ChannelAdminManager/form';
import ThisBtns from '@/containers/channel/ChannelAdminManager/btns';
import ThisPasswordForm from '@/containers/channel/ChannelAdminManager/passwordForm';
import ThisConfigForm from '@/containers/channel/ChannelAdminManager/configForm';

const ChannelAdminManager = () => (
  <React.Fragment>
    <ThisSearchForm />
    <Divider style={{ margin: '0 0 -1px 0' }} />
    <ThisBtns />
    <Divider style={{ margin: 0 }} />
    <ThisTable />
    <ThisForm />
    <ThisPasswordForm />
    <ThisConfigForm />
  </React.Fragment>
);

export default ChannelAdminManager;
