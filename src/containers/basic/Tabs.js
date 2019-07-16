import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import Tabs from '@/components/basic/Tabs';

const { MENU, TABS } = Actions;

class ContainersTabs extends BaseComponent {
  static propTypes = {
    tabs: ImmutablePropTypes.list.isRequired,
    breadcrumb: PropTypes.object.isRequired,
    addTabsList: PropTypes.func.isRequired,
    removeTabsList: PropTypes.func.isRequired,
    reserveTabsList: PropTypes.func.isRequired,
    clearTabsList: PropTypes.func.isRequired,
    setMenuKey: PropTypes.func.isRequired,
  }
  componentDidUpdate() {
    const have = this.props.tabs.some(item => item.get('path') === this.props.history.location.pathname);
    const tab = this.props.breadcrumb.get('list').find(item => item.get('path') === this.props.history.location.pathname);
    if (!have && tab) {
      this.props.addTabsList(tab);
    }
  }
  render() {
    return <Tabs {...this.props} />;
  }
}

const mapStateToProps = state => ({
  breadcrumb: state.getIn(['basic', 'breadcrumb']),
  tabs: state.getIn(['basic', 'tabs']),
});

const mapDispatchToProps = {
  addTabsList: TABS.add,
  removeTabsList: TABS.remove,
  reserveTabsList: TABS.reserve,
  clearTabsList: TABS.clear,
  setMenuKey: MENU.setKey,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersTabs);