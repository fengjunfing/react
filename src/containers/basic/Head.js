import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import MenuCollapsed from '@/components/basic/head/MenuCollapsed';
import TopBreadcrumb from '@/components/basic/head/TopBreadcrumb';
import MenuType from '@/components/basic/head/MenuType';
import Theme from '@/components/basic/head/Theme';
import UserDropdown from '@/components/basic/head/UserDropdown';
import UserCenter from '@/components/basic/head/UserCenter';

class ContainersHead extends BaseComponent {
  static propTypes = {
    menu: ImmutablePropTypes.map.isRequired,
    menuType: PropTypes.string.isRequired,
    breadcrumb: ImmutablePropTypes.map.isRequired,
    collapsed: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    userCenterData: ImmutablePropTypes.map.isRequired,
    changeType: PropTypes.func.isRequired,
    setCollapsed: PropTypes.func.isRequired,
    setBreadcrumbKey: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    userCenterGet: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
    hide: PropTypes.func.isRequired,
  }
  componentWillMount() {
    this.props.userCenterGet();
  }
  componentDidUpdate() {
    if (this.props.history.location.pathname !== this.props.breadcrumb.get('key').get(0)) {
      this.props.setBreadcrumbKey(this.props.history.location.pathname);
    }
  }
  logout() {
    this.props.logout().then((response) => {
      if (response.getIn(['result', 'enableCas'])) {
        window.location.href = response.getIn(['result', 'casServerUrlPrefix']) + '/logout?service=' + window.location.href;
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <MenuCollapsed collapsed={this.props.collapsed} setCollapsed={this.props.setCollapsed} />
        <TopBreadcrumb breadcrumb={this.props.breadcrumb} />
        <div style={{ float: 'right' }}>
          <MenuType menuType={this.props.menuType} changeType={this.props.changeType} />
          <Theme />
          <UserDropdown show={this.props.show} logout={this.logout} parent={this} userCenterData={this.props.userCenterData} />
        </div>
        <UserCenter visible={this.props.visible} hide={this.props.hide} userCenterData={this.props.userCenterData} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    menu: state.getIn(['basic', 'menu']),
    menuType: state.getIn(['basic', 'menu', 'type']),
    breadcrumb: state.getIn(['basic', 'breadcrumb']),
    collapsed: state.getIn(['basic', 'menu', 'collapsed']),
    visible: state.getIn(['basic', 'userCenter', 'visible']),
    userCenterData: state.getIn(['basic', 'userCenter', 'data', 'user']),
  };
};

const { MENU, BREADCRUMB, LOGIN, USERCENTER } = Actions;

const mapDispatchToProps = {
  changeType: MENU.changeType,
  setCollapsed: MENU.setCollapsed,
  setBreadcrumbKey: BREADCRUMB.setKey,
  logout: LOGIN.logout,
  userCenterGet: USERCENTER.getData,
  show: USERCENTER.show,
  hide: USERCENTER.hide,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersHead);
