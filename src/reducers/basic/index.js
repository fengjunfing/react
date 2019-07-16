import { combineReducers } from 'redux-immutable';
import login from './login';
import dict from './dict';
import menu from './menu';
import breadcrumb from './breadcrumb';
import userCenter from './userCenter';
import tabs from './tabs';

export default combineReducers({
  login,
  dict,
  menu,
  breadcrumb,
  userCenter,
  tabs,
});
