import Immutable from 'immutable';
import Actions from '@/actions';

const thunks = Actions.LOGIN.thunk;
const actions = Actions.LOGIN.action;

const initialState = Immutable.fromJS({
  isLogin: localStorage.getItem('login') === 'true' ? true : false
});

export default (state = initialState, action) => {
  switch (action.type) {
  case thunks.login.REQUESTTYPE:
    return state;
  case thunks.login.SUCCESSTYPE:
    localStorage.setItem('login', action.response.get('success'));
    localStorage.setItem('token', action.response.getIn(['result', 'sessionId']));
    return state
      .set('isLogin', action.response.get('success'));
  case thunks.login.FAILURETYPE:
    return state;
  case thunks.logout.REQUESTTYPE:
    return state;
  case thunks.logout.SUCCESSTYPE:
    localStorage.removeItem('login');
    return state
      .set('isLogin', false);
  case thunks.logout.FAILURETYPE:
    return state;
  case actions.SET_LOGIN:
    localStorage.setItem('login', true);
    localStorage.setItem('token', action.params.getIn(['result', 'sessionId']));
    return state
      .set('isLogin', true);
  default:
    return state;
  }
};