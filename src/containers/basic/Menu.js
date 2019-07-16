import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import MenuList from '@/components/basic/Menu';

class ContainersMenu extends BaseComponent {
  static propTypes = {
    dictData: ImmutablePropTypes.map.isRequired,
    dictGet: PropTypes.func.isRequired,
    menu: ImmutablePropTypes.map.isRequired,
    menuType: PropTypes.string.isRequired,
    breadcrumb: PropTypes.object.isRequired,
    menuKey: PropTypes.array.isRequired,
    getMenu: PropTypes.func.isRequired,
    setMenuKey: PropTypes.func.isRequired,
    setTabs: PropTypes.func.isRequired,
    setBreadCrumb: PropTypes.func.isRequired,
  }
  componentWillMount() {
    this.props.dictGet().then(() =>{
      this.props.getMenu().then(() => {
        this.props.setMenuKey(this.props.history.location.pathname);
        this.props.setTabs(this.props.menu.getIn(['list', 'breadCrumb']));
        this.props.setBreadCrumb(this.props.menu.getIn(['list', 'breadCrumb']));
      });
    });
  }
  componentDidUpdate() {
    if (this.props.history.location.pathname !== this.props.breadcrumb.get('key').get(0)) {
      this.props.setMenuKey(this.props.history.location.pathname);
    }
  }
  render() {
    return <MenuList {...this.props} />;
  }
}

const mapStateToProps = state => ({
  dictData: state.getIn(['basic', 'dict', 'data']),
  menu: state.getIn(['basic', 'menu']),
  breadcrumb: state.getIn(['basic', 'breadcrumb']),
  menuKey: state.getIn(['basic', 'menu', 'key']),
  menuType: state.getIn(['basic', 'menu', 'type']),
});

const { DICT, MENU, TABS, BREADCRUMB } = Actions;

const mapDispatchToProps = {
  dictGet: DICT.getData,
  getMenu: MENU.getList,
  setMenuKey: MENU.setKey,
  setTabs: TABS.set,
  setBreadCrumb: BREADCRUMB.set,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersMenu);