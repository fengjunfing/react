const THISACTION = 'MENU' + '_';

import { transToThunk } from '@/util';

const thunk = {
  getList: transToThunk('GETLIST'),
};

const action = {
  KEY: THISACTION + 'KEY',
  COLLAPSED: THISACTION + 'COLLAPSED',
  CHANGE_TYPE: THISACTION + 'CHANGE_TYPE',
};

const getList = () => dispatch => dispatch({
  [THISACTION + 'GETDATA']: {
    types: Object.values(thunk.getList),
    url: 'menu/loadUserMenuTree'
  }
});

const changeType = menuType => dispatch => dispatch({
  type: action.CHANGE_TYPE,
  menuType,
});

const setKey = path => dispatch => dispatch({
  type: action.KEY,
  path,
});

const setCollapsed = bool => dispatch => dispatch({
  type: action.COLLAPSED,
  bool,
});

export default {
  thunk, // 以下为接口调用
  getList,
  action, // 以下为修改数据
  changeType,
  setKey,
  setCollapsed,
};