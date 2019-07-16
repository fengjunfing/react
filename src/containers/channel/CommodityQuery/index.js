import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from '@/components/basic/BaseComponent';
import ThisIndex from '@/components/channel/CommodityQuery';

class ContainersCommodityQuery extends BaseComponent {
  render() {
    return <ThisIndex {...this.props} />;
  }
}

const mapStateToProps = state => {
  const data = state.getIn(['channel', 'commodityQuery']);
  return {
    visible: data.getIn(['form', 'visible']),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersCommodityQuery);
