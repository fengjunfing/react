import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '@/components/basic/BaseComponent';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { LocaleProvider, message } from 'antd';
import defaultMenuType from '@/publicData/menuType';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import '@/noModuleStyle/hideScroll.css';
import '@/noModuleStyle/carousel.css';
import '@/noModuleStyle/expandTable.css';
import '@/noModuleStyle/tablexscroll.css';
import '@/noModuleStyle/inputSelect.css';
import '@/noModuleStyle/inputDate.css';
import '@/noModuleStyle/formInline.css';

import '@/noModuleStyle/public.sass';
import '@/noModuleStyle/leftsTabs.sass';

import App from './App';
import Login from './Login';

moment.locale('zh-cn');

class Root extends BaseComponent {
  static propTypes = {
    login: PropTypes.bool.isRequired,
  }
  componentWillMount() {
    if (!this.props.login) {
      this.props.history.replace('/');
    }
    message.config({
      top: 0,
      duration: 10,
      maxCount: 3,
    });
    this.renderTheme();
  }
  renderTheme () {
    var theme = JSON.parse(localStorage.getItem(window.location.origin + (window.ctxPath || '/') + 'color.less:vars'));
    const height = (localStorage.getItem('menuType') || defaultMenuType) === 'left' ? '0px' : '48px';
    if (theme) {
      window.less.modifyVars({...theme,
        '@extraPx': height,
      });
    } else {
      window.less.modifyVars({
        '@extraPx': height,
        '@primary-color': '#1890ff',
      });
    }
  }
  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        {
          this.props.login ?
            <Route path='/' component={App} /> :
            <Route path='/' component={Login} />
        }
      </LocaleProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  store: ownProps.store,
  login: state.getIn(['basic', 'login', 'isLogin']),
});

export default withRouter(connect(mapStateToProps)(Root));