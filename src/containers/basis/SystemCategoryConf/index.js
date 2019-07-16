import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from '@/components/basic/BaseComponent';
import ThisIndex from '@/components/basis/SystemCategoryConf';

class ContainersSystemCategoryConf extends BaseComponent {
  render() {
    return <ThisIndex {...this.props} />;
  }
}

const mapStateToProps = state => {
  const data = state.getIn(['basis', 'systemCategoryConf']);
  return {
    visible: data.getIn(['form', 'visible']),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersSystemCategoryConf);
