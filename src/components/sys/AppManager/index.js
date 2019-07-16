import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';
import ThisBtns from '@/containers/sys/AppManager/btns';
import ThisTable from '@/containers/sys/AppManager/table';
import ThisForm from '@/containers/sys/AppManager/form';
import SingleImageModal from '@/components/common/SingleImageModal';

export default class ComponentsAppManager extends React.Component {
  static propTypes = {
    data: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    hide: PropTypes.func.isRequired,
  }
  render() {
    return (
      <React.Fragment>
        <ThisBtns />
        <Divider style={{ margin: 0 }} />
        <ThisTable />
        <ThisForm />
        <SingleImageModal {...this.props} />
      </React.Fragment>
    );
  }
}