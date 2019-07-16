import React, { Component } from 'react';
import { Divider, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import ThisBtns from '@/containers/sys/DictManager/btns';
import ThisTable from '@/containers/sys/DictManager/table';
import ThisForm from '@/containers/sys/DictManager/form';
import ThisChildBtns from '@/containers/sys/DictManager/child/btns';
import ThisChildTable from '@/containers/sys/DictManager/child/table';
import ThisChildForm from '@/containers/sys/DictManager/child/form';

class ComponentsSysDictManager extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  }
  render() {
    return (
      <React.Fragment>
        {
          this.props.visible ?
            <Row>
              <Col span={8}>
                <ThisBtns />
                <Divider style={{ margin: 0 }} />
                <ThisTable />
              </Col>
              <Col span={15} offset={1}>
                <ThisChildBtns />
                <Divider style={{ margin: 0 }} />
                <ThisChildTable />
              </Col>
            </Row> :
            <Row>
              <Col span={24}>
                <ThisBtns />
                <Divider style={{ margin: 0 }} />
                <ThisTable />
              </Col>
            </Row>
        }
        <ThisForm />
        <ThisChildForm />
      </React.Fragment>
    );
  }
}

export default ComponentsSysDictManager;