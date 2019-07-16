import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from '@/components/basic/BaseComponent';
import ThisIndex from '@/components/operation/BulletinManager';

class ContainersBulletinManager extends BaseComponent {
  render() {
    return <ThisIndex {...this.props} />;
  }
}

const mapStateToProps = state => {
  const data = state.getIn(['operation', 'bulletinManager']);
  return {
    visible: data.getIn(['form', 'visible']),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersBulletinManager);
