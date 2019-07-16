import React from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import BaseComponent from '@/components/basic/BaseComponent';
import Actions from '@/actions';
import App from '@/components/basic/App';

class ContainersApp extends BaseComponent {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    breadCrumb: ImmutablePropTypes.list.isRequired,
    menuType: PropTypes.string.isRequired,
    removeTabsList: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      isRefresh: true,
    };
  }
  componentWillMount() {
    if (this.props.history.location.pathname.search(/\/;jsessionid=[^/]*/) > -1) {
      this.props.history.replace(this.props.history.location.pathname.replace(/\/;jsessionid=[^/]*/, ''));
    }
    if (this.props.history.location.pathname === '/') {
      this.props.history.replace('/Home');
    }
  }
  componentWillUpdate() {
    setTimeout(() => {
      if (this.state.isRefresh && this.props.breadCrumb && this.props.breadCrumb.size && !this.props.breadCrumb.some(t => t.get('path') === this.props.history.location.pathname)) {
        this.props.removeTabsList(this.props.history.location.pathname);
        this.props.history.replace('/Home');
        this.setState({isRefresh: false});
      }
    }, 0);
  }
  render() {
    return <App {...this.props} />;
  }
}

const mapStateToProps = state => ({
  collapsed: state.getIn(['basic', 'menu', 'collapsed']),
  breadCrumb: state.getIn(['basic', 'menu', 'list', 'breadCrumb']),
  menuType: state.getIn(['basic', 'menu', 'type']),
});

const { TABS } = Actions;

const mapDispatchToProps = {
  removeTabsList: TABS.remove,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainersApp);
