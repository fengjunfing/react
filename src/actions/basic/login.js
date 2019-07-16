import { transToThunk } from '@/util';

const thunk = {
  login: transToThunk('LOGIN'),
  logout: transToThunk('LOGOUT'),
};

const login = params => dispatch => dispatch({
  LOGIN: {
    types: Object.values(thunk.login),
    url: 'login/doLogin',
    params,
  }
});

const logout = () => dispatch => dispatch({
  LOGOUT: {
    types: Object.values(thunk.logout),
    url: 'login/logout',
  }
});

const action = {
  SET_LOGIN: 'LOGIN_SET_LOGIN',
};

const setLogin = params => dispatch => dispatch({
  type: action.SET_LOGIN,
  params,
});

export default {
  thunk,
  login,
  logout,
  action,
  setLogin,
};
