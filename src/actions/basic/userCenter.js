const THISACTION = 'USERCENTER' + '_';

import { transToThunk } from '@/util';

const thunk = {
  getData: transToThunk('GET'),
};

const getData = () => dispatch => dispatch({
  [THISACTION + 'GETDATA']: {
    types: Object.values(thunk.getData),
    url: 'login/getCurUserInfo',
  }
});

const action = {
  SHOW: THISACTION + 'SHOW',
  HIDE: THISACTION + 'HIDE',
};

const show = () => dispatch => dispatch({
  type: action.SHOW
});

const hide = () => dispatch => dispatch({
  type: action.HIDE
});

export default {
  thunk, // 以下为接口调用
  getData,
  action, // 以下为修改数据
  show,
  hide,
};