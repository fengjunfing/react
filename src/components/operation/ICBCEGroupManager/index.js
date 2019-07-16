import React, { Component } from 'react';
import { Divider, Row, Col } from 'antd';
import ThisSearchForm from '@/containers/operation/ICBCEGroupManager/searchForm';
import ThisTable from '@/containers/operation/ICBCEGroupManager/table';
import ThisForm from '@/containers/operation/ICBCEGroupManager/form';
import ThisBtns from '@/containers/operation/ICBCEGroupManager/btns';
import ThisNameForm from '@/containers/operation/ICBCEGroupManager/nameForm';

import ThisLefts from '@/containers/operation/ICBCEGroupManager/lefts';
import ThisLeftsForm from '@/containers/operation/ICBCEGroupManager/leftsForm';

class ICBCEGroupManager extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col span={18} push={6}>
            <div style={{ display: this.props.visible ? 'none' : 'block' }}>
              <ThisSearchForm />
              <Divider style={{ margin: '0 0 -1px 0' }} />
              <ThisBtns />
              <Divider style={{ margin: 0 }} />
              <ThisTable />
            </div>
            {this.props.visible && <React.Fragment>
              <ThisForm />
              <ThisNameForm />
            </React.Fragment>}
          </Col>
          <Col span={6} pull={18}>
            <ThisLefts />
            <ThisLeftsForm />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default ICBCEGroupManager;
